import { Input } from "../ui/input";
import { Label } from "../ui/label";

export function LabelWrapper({
	label,
	styles,
	children,
}: { label: string; styles?: string; children: React.ReactNode }) {
	return (
		<div className={`grid w-full max-w-sm items-center gap-1.5 ${styles}`}>
			<Label htmlFor={label.toLowerCase()}>{label}</Label>
			{children}
		</div>
	);
}
