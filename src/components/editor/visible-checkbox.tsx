import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"

type Props = {
    isVisible: boolean
    setVisible: (isVisible: boolean) => void
}

export function VisibleCheckbox({ isVisible, setVisible }: Props) {
    return (
        <div className="flex items-center gap-2">
            <Checkbox
                id="visible"
                checked={isVisible}
                onCheckedChange={(checked) => setVisible(checked === true)}
            />
            <Label htmlFor="visible">Visible</Label>
        </div>
    )
}
