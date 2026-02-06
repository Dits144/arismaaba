
-- Create app_role enum for admin roles
CREATE TYPE public.app_role AS ENUM ('admin', 'moderator', 'user');

-- Create user_roles table for role management
CREATE TABLE public.user_roles (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
    role app_role NOT NULL DEFAULT 'user',
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    UNIQUE (user_id, role)
);

-- Enable RLS on user_roles
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

-- Create security definer function to check roles
CREATE OR REPLACE FUNCTION public.has_role(_user_id UUID, _role app_role)
RETURNS BOOLEAN
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.user_roles
    WHERE user_id = _user_id
      AND role = _role
  )
$$;

-- Create events table
CREATE TABLE public.events (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title TEXT NOT NULL,
    slug TEXT NOT NULL UNIQUE,
    start_date TIMESTAMP WITH TIME ZONE NOT NULL,
    end_date TIMESTAMP WITH TIME ZONE,
    location TEXT,
    description TEXT,
    poster_url TEXT,
    registration_url TEXT,
    created_by UUID REFERENCES auth.users(id),
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.events ENABLE ROW LEVEL SECURITY;

-- Create articles table
CREATE TABLE public.articles (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title TEXT NOT NULL,
    slug TEXT NOT NULL UNIQUE,
    excerpt TEXT,
    content TEXT,
    thumbnail_url TEXT,
    category TEXT,
    tags JSONB DEFAULT '[]'::jsonb,
    status TEXT NOT NULL DEFAULT 'draft' CHECK (status IN ('draft', 'published')),
    published_at TIMESTAMP WITH TIME ZONE,
    created_by UUID REFERENCES auth.users(id),
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.articles ENABLE ROW LEVEL SECURITY;

-- Create gallery_categories table
CREATE TABLE public.gallery_categories (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    slug TEXT NOT NULL UNIQUE,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.gallery_categories ENABLE ROW LEVEL SECURITY;

-- Create gallery_items table
CREATE TABLE public.gallery_items (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title TEXT,
    image_url TEXT NOT NULL,
    category_id UUID REFERENCES public.gallery_categories(id) ON DELETE SET NULL,
    event_id UUID REFERENCES public.events(id) ON DELETE SET NULL,
    taken_at DATE,
    created_by UUID REFERENCES auth.users(id),
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.gallery_items ENABLE ROW LEVEL SECURITY;

-- Create divisions table
CREATE TABLE public.divisions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    slug TEXT NOT NULL UNIQUE,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.divisions ENABLE ROW LEVEL SECURITY;

-- Create members table for organizational structure
CREATE TABLE public.members (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    photo_url TEXT,
    position TEXT NOT NULL,
    division_id UUID REFERENCES public.divisions(id) ON DELETE SET NULL,
    parent_id UUID REFERENCES public.members(id) ON DELETE SET NULL,
    order_index INTEGER NOT NULL DEFAULT 0,
    active BOOLEAN NOT NULL DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.members ENABLE ROW LEVEL SECURITY;

-- Create organization_settings table
CREATE TABLE public.organization_settings (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    key TEXT NOT NULL UNIQUE,
    value TEXT,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.organization_settings ENABLE ROW LEVEL SECURITY;

-- RLS Policies for user_roles
CREATE POLICY "Admins can manage user roles"
ON public.user_roles
FOR ALL
TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Users can view their own roles"
ON public.user_roles
FOR SELECT
TO authenticated
USING (auth.uid() = user_id);

-- RLS Policies for events (public read, admin write)
CREATE POLICY "Anyone can view events"
ON public.events FOR SELECT
USING (true);

CREATE POLICY "Admins can manage events"
ON public.events FOR ALL
TO authenticated
USING (public.has_role(auth.uid(), 'admin'))
WITH CHECK (public.has_role(auth.uid(), 'admin'));

-- RLS Policies for articles (public read published, admin write)
CREATE POLICY "Anyone can view published articles"
ON public.articles FOR SELECT
USING (status = 'published');

CREATE POLICY "Admins can manage all articles"
ON public.articles FOR ALL
TO authenticated
USING (public.has_role(auth.uid(), 'admin'))
WITH CHECK (public.has_role(auth.uid(), 'admin'));

-- RLS Policies for gallery_categories
CREATE POLICY "Anyone can view gallery categories"
ON public.gallery_categories FOR SELECT
USING (true);

CREATE POLICY "Admins can manage gallery categories"
ON public.gallery_categories FOR ALL
TO authenticated
USING (public.has_role(auth.uid(), 'admin'))
WITH CHECK (public.has_role(auth.uid(), 'admin'));

-- RLS Policies for gallery_items
CREATE POLICY "Anyone can view gallery items"
ON public.gallery_items FOR SELECT
USING (true);

CREATE POLICY "Admins can manage gallery items"
ON public.gallery_items FOR ALL
TO authenticated
USING (public.has_role(auth.uid(), 'admin'))
WITH CHECK (public.has_role(auth.uid(), 'admin'));

-- RLS Policies for divisions
CREATE POLICY "Anyone can view divisions"
ON public.divisions FOR SELECT
USING (true);

CREATE POLICY "Admins can manage divisions"
ON public.divisions FOR ALL
TO authenticated
USING (public.has_role(auth.uid(), 'admin'))
WITH CHECK (public.has_role(auth.uid(), 'admin'));

-- RLS Policies for members (active only for public)
CREATE POLICY "Anyone can view active members"
ON public.members FOR SELECT
USING (active = true);

CREATE POLICY "Admins can manage all members"
ON public.members FOR ALL
TO authenticated
USING (public.has_role(auth.uid(), 'admin'))
WITH CHECK (public.has_role(auth.uid(), 'admin'));

-- RLS Policies for organization_settings
CREATE POLICY "Anyone can view settings"
ON public.organization_settings FOR SELECT
USING (true);

CREATE POLICY "Admins can manage settings"
ON public.organization_settings FOR ALL
TO authenticated
USING (public.has_role(auth.uid(), 'admin'))
WITH CHECK (public.has_role(auth.uid(), 'admin'));

-- Create function to update timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

-- Create triggers for updated_at
CREATE TRIGGER update_events_updated_at
    BEFORE UPDATE ON public.events
    FOR EACH ROW
    EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_articles_updated_at
    BEFORE UPDATE ON public.articles
    FOR EACH ROW
    EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_members_updated_at
    BEFORE UPDATE ON public.members
    FOR EACH ROW
    EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_org_settings_updated_at
    BEFORE UPDATE ON public.organization_settings
    FOR EACH ROW
    EXECUTE FUNCTION public.update_updated_at_column();

-- Create storage buckets
INSERT INTO storage.buckets (id, name, public) VALUES ('posters', 'posters', true);
INSERT INTO storage.buckets (id, name, public) VALUES ('thumbnails', 'thumbnails', true);
INSERT INTO storage.buckets (id, name, public) VALUES ('gallery', 'gallery', true);
INSERT INTO storage.buckets (id, name, public) VALUES ('members', 'members', true);

-- Storage policies for posters
CREATE POLICY "Public can view posters"
ON storage.objects FOR SELECT
USING (bucket_id = 'posters');

CREATE POLICY "Admins can upload posters"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (bucket_id = 'posters' AND public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can update posters"
ON storage.objects FOR UPDATE
TO authenticated
USING (bucket_id = 'posters' AND public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can delete posters"
ON storage.objects FOR DELETE
TO authenticated
USING (bucket_id = 'posters' AND public.has_role(auth.uid(), 'admin'));

-- Storage policies for thumbnails
CREATE POLICY "Public can view thumbnails"
ON storage.objects FOR SELECT
USING (bucket_id = 'thumbnails');

CREATE POLICY "Admins can upload thumbnails"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (bucket_id = 'thumbnails' AND public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can update thumbnails"
ON storage.objects FOR UPDATE
TO authenticated
USING (bucket_id = 'thumbnails' AND public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can delete thumbnails"
ON storage.objects FOR DELETE
TO authenticated
USING (bucket_id = 'thumbnails' AND public.has_role(auth.uid(), 'admin'));

-- Storage policies for gallery
CREATE POLICY "Public can view gallery"
ON storage.objects FOR SELECT
USING (bucket_id = 'gallery');

CREATE POLICY "Admins can upload gallery"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (bucket_id = 'gallery' AND public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can update gallery"
ON storage.objects FOR UPDATE
TO authenticated
USING (bucket_id = 'gallery' AND public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can delete gallery"
ON storage.objects FOR DELETE
TO authenticated
USING (bucket_id = 'gallery' AND public.has_role(auth.uid(), 'admin'));

-- Storage policies for members photos
CREATE POLICY "Public can view members photos"
ON storage.objects FOR SELECT
USING (bucket_id = 'members');

CREATE POLICY "Admins can upload members photos"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (bucket_id = 'members' AND public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can update members photos"
ON storage.objects FOR UPDATE
TO authenticated
USING (bucket_id = 'members' AND public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can delete members photos"
ON storage.objects FOR DELETE
TO authenticated
USING (bucket_id = 'members' AND public.has_role(auth.uid(), 'admin'));

-- Insert default divisions
INSERT INTO public.divisions (name, slug) VALUES
    ('Pendidikan', 'pendidikan'),
    ('Humas', 'humas'),
    ('PDD', 'pdd'),
    ('Logistik', 'logistik');

-- Insert default gallery categories
INSERT INTO public.gallery_categories (name, slug) VALUES
    ('Muharram Cup 2025', 'muharram-cup-2025'),
    ('Ramadhan', 'ramadhan'),
    ('Kajian', 'kajian'),
    ('Baksos', 'baksos'),
    ('Lainnya', 'lainnya');

-- Insert default organization settings
INSERT INTO public.organization_settings (key, value) VALUES
    ('mosque_name', 'Masjid ''Amru Bin ''Ash'),
    ('mosque_address', 'Jl. Contoh Alamat No. 123, Jakarta'),
    ('phone', '+62 812-3456-7890'),
    ('email', 'arismaaba19@gmail.com'),
    ('instagram', '@arisma_aba'),
    ('visi', 'Mewujudkan remaja muslim yang berakhlak mulia, berilmu, dan bermanfaat bagi umat.'),
    ('misi', '["Menyelenggarakan kegiatan keislaman untuk remaja", "Membangun ukhuwah islamiyah antar remaja masjid", "Mengembangkan potensi dan kreativitas remaja", "Berkontribusi dalam kegiatan sosial kemasyarakatan"]');
