import Navbar from '@/Components/Frontend/Navbar';
import Footer from '@/Components/Frontend/Footer';
import { Head } from '@inertiajs/react';

export default function FrontendLayout({ children, title }) {
    return (
        <>
            <Head title={title} />
            <div className="min-h-screen bg-gray-50">
                <Navbar />
                <main>{children}</main>
                <Footer />
            </div>
        </>
    );
}
