import Footer from "./footer/footer";
import Header from "./header/header";


export default function UserLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <>
            <Header />
            <div className="pt-20">{children}</div>
            <Footer />
        </>
    );
}
