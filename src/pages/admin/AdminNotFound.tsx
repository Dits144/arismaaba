import { AdminLayout } from "@/components/admin/AdminLayout";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

const AdminNotFound = () => (
  <AdminLayout>
    <div className="flex flex-col items-center justify-center py-20 text-center">
      <h1 className="text-6xl font-bold text-foreground mb-4">404</h1>
      <p className="text-xl text-muted-foreground mb-8">Halaman admin tidak ditemukan</p>
      <Button asChild className="bg-accent text-accent-foreground hover:bg-accent/90">
        <Link to="/admin">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Kembali ke Dashboard
        </Link>
      </Button>
    </div>
  </AdminLayout>
);

export default AdminNotFound;
