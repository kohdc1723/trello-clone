import React from "react";

import Navbar from "./_components/navbar";
import Footer from "./_components/footer";
import "../globals.css";

const MarketingLayout = ({
    children
}: {
    children: React.ReactNode
}) => {
    return (
        <div className="h-full">
            <Navbar />

            <main className="min-h-screen pt-40 pb-20 bg-gradient-to-r from-purple-600 to-pink-500">
                {children}
            </main>
            
            <Footer />
        </div>
    );
}

export default MarketingLayout;