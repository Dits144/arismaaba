
-- Fix RLS policies: Change from RESTRICTIVE to PERMISSIVE
-- Drop all existing policies and recreate as PERMISSIVE

-- EVENTS
DROP POLICY IF EXISTS "Admins can manage events" ON public.events;
DROP POLICY IF EXISTS "Anyone can view events" ON public.events;
CREATE POLICY "Admins can manage events" ON public.events FOR ALL TO authenticated USING (public.has_role(auth.uid(), 'admin'::app_role)) WITH CHECK (public.has_role(auth.uid(), 'admin'::app_role));
CREATE POLICY "Anyone can view events" ON public.events FOR SELECT TO anon, authenticated USING (true);

-- ARTICLES
DROP POLICY IF EXISTS "Admins can manage all articles" ON public.articles;
DROP POLICY IF EXISTS "Anyone can view published articles" ON public.articles;
CREATE POLICY "Admins can manage all articles" ON public.articles FOR ALL TO authenticated USING (public.has_role(auth.uid(), 'admin'::app_role)) WITH CHECK (public.has_role(auth.uid(), 'admin'::app_role));
CREATE POLICY "Anyone can view published articles" ON public.articles FOR SELECT TO anon, authenticated USING (status = 'published');

-- GALLERY ITEMS
DROP POLICY IF EXISTS "Admins can manage gallery items" ON public.gallery_items;
DROP POLICY IF EXISTS "Anyone can view gallery items" ON public.gallery_items;
CREATE POLICY "Admins can manage gallery items" ON public.gallery_items FOR ALL TO authenticated USING (public.has_role(auth.uid(), 'admin'::app_role)) WITH CHECK (public.has_role(auth.uid(), 'admin'::app_role));
CREATE POLICY "Anyone can view gallery items" ON public.gallery_items FOR SELECT TO anon, authenticated USING (true);

-- GALLERY CATEGORIES
DROP POLICY IF EXISTS "Admins can manage gallery categories" ON public.gallery_categories;
DROP POLICY IF EXISTS "Anyone can view gallery categories" ON public.gallery_categories;
CREATE POLICY "Admins can manage gallery categories" ON public.gallery_categories FOR ALL TO authenticated USING (public.has_role(auth.uid(), 'admin'::app_role)) WITH CHECK (public.has_role(auth.uid(), 'admin'::app_role));
CREATE POLICY "Anyone can view gallery categories" ON public.gallery_categories FOR SELECT TO anon, authenticated USING (true);

-- MEMBERS
DROP POLICY IF EXISTS "Admins can manage all members" ON public.members;
DROP POLICY IF EXISTS "Anyone can view active members" ON public.members;
CREATE POLICY "Admins can manage all members" ON public.members FOR ALL TO authenticated USING (public.has_role(auth.uid(), 'admin'::app_role)) WITH CHECK (public.has_role(auth.uid(), 'admin'::app_role));
CREATE POLICY "Anyone can view active members" ON public.members FOR SELECT TO anon, authenticated USING (active = true);

-- DIVISIONS
DROP POLICY IF EXISTS "Admins can manage divisions" ON public.divisions;
DROP POLICY IF EXISTS "Anyone can view divisions" ON public.divisions;
CREATE POLICY "Admins can manage divisions" ON public.divisions FOR ALL TO authenticated USING (public.has_role(auth.uid(), 'admin'::app_role)) WITH CHECK (public.has_role(auth.uid(), 'admin'::app_role));
CREATE POLICY "Anyone can view divisions" ON public.divisions FOR SELECT TO anon, authenticated USING (true);

-- ORGANIZATION SETTINGS
DROP POLICY IF EXISTS "Admins can manage settings" ON public.organization_settings;
DROP POLICY IF EXISTS "Anyone can view settings" ON public.organization_settings;
CREATE POLICY "Admins can manage settings" ON public.organization_settings FOR ALL TO authenticated USING (public.has_role(auth.uid(), 'admin'::app_role)) WITH CHECK (public.has_role(auth.uid(), 'admin'::app_role));
CREATE POLICY "Anyone can view settings" ON public.organization_settings FOR SELECT TO anon, authenticated USING (true);

-- USER ROLES
DROP POLICY IF EXISTS "Admins can manage user roles" ON public.user_roles;
DROP POLICY IF EXISTS "Users can view their own roles" ON public.user_roles;
CREATE POLICY "Admins can manage user roles" ON public.user_roles FOR ALL TO authenticated USING (public.has_role(auth.uid(), 'admin'::app_role));
CREATE POLICY "Users can view their own roles" ON public.user_roles FOR SELECT TO authenticated USING (auth.uid() = user_id);
