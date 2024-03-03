import Link from "next/link";
import { Medal } from "lucide-react";

import { Button } from "@/components/ui/button";
import Image from "next/image";
import Marketing from "@/public/marketing.png";

const MarketingPage = () => {
    return (
        <div className="flex items-center justify-center flex-col lg:flex-row">
            <div className="flex items-center justify-center flex-col flex-1 p-10 gap-5">
                <p className="text-white lg:text-5xl text-4xl text-center font-bold">
                    Trello brings all your tasks, teammates, and tools together
                </p>
                <p className="text-white text-md text-center text-lg">
                    Keep everything in the same place—even if your team isn’t.
                </p>
                <Button className="mt-6" size="lg" asChild>
                    <Link href="/signup">
                        Get Trello for free
                    </Link>
                </Button>
            </div>
            <div className="flex items-center justify-center flex-1">
                <Image
                    src={Marketing}
                    alt="marketing"
                    className="lg:w-[480px] lg:h-[480px] md:w-[420px] md:h-[420px] w-[360px] h-[360px]"
                />
            </div>
        </div>
    );
};

export default MarketingPage;