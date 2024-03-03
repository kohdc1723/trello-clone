import Link from "next/link";
import Image from "next/image";

const Logo = () => {
    return (
        <Link href="/">
            <div className="hover:opacity-75 transition items-center gap-x-2 hidden md:flex">
                <Image
                    src="/logo.svg"
                    alt="logo"
                    height={30}
                    width={30}
                />
                <p className="font-black text-lg text-neutral-700 pb-1">
                    Trello
                </p>
            </div>
        </Link>
    );
};

export default Logo;