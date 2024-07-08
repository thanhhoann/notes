import { Input } from "../ui/input";
import { Label } from "../ui/label";

export function LabelWrapper({
	label,
	className,
	children,
}: { label: string; className?: string; children: React.ReactNode }) {
	return (
		<div className={`grid items-center gap-1.5 ${className}`}>
			<Label htmlFor={label.toLowerCase()}>{label}</Label>
			{children}
		</div>
	);
}
