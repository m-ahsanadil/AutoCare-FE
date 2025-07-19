import * as LucideIcons from "lucide-react";
import type { LucideIcon } from "lucide-react";

// Function to get icon component from string
export const getIconComponent = (iconName: string): LucideIcon => {
    const icons = LucideIcons as unknown as Record<string, LucideIcon>;
    return icons[iconName] || LucideIcons.HelpCircle;
};