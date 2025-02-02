import * as React from "react";
import { MoonIcon, SunIcon } from "@radix-ui/react-icons";
import { useTheme } from "next-themes";
import { Switch } from "@headlessui/react";

export default function ModeToggle() {
    const { theme, setTheme } = useTheme();
    const [mounted, setMounted] = React.useState(false);

    React.useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) {
        return null;
    }

    const isDark = theme === "dark";

    return (
        <div className="flex items-center space-x-2">
            <Switch
                checked={isDark}
                onChange={() => setTheme(isDark ? "light" : "dark")}
                className={`${isDark ? "bg-purple-600" : "bg-gray-200"
                    } relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none`}
            >
                <span
                    className={`${isDark ? "translate-x-6" : "translate-x-1"
                        } inline-block h-4 w-4 transform rounded-full bg-white transition-transform`}
                />
            </Switch>
            {isDark ? <SunIcon /> : <MoonIcon />}
        </div>
    );
}
