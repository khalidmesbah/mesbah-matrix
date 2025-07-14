import { Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import type { SizeT, VariantT } from '@/lib/types/globals';

type IconProps = {
  icon: React.ReactElement;
  size?: SizeT;
  variant?: VariantT;
  className?: string;
  description?: string;
  disabled?: boolean;
  loading?: boolean;
  onClick?: () => void;
};

export default function Icon({
  icon,
  disabled = false,
  description,
  loading = false,
  size = 'icon',
  variant = 'outline',
  className,
  onClick,
}: IconProps) {
  if (!description)
    return (
      <Button
        size={size}
        variant={variant}
        onClick={onClick}
        className={className}
        disabled={disabled}
      >
        {icon}
      </Button>
    );
  return (
    <TooltipProvider>
      <Tooltip delayDuration={300}>
        <TooltipTrigger asChild>
          <Button
            size={size || 'icon'}
            variant={variant || 'outline'}
            onClick={onClick}
            className={className}
            disabled={disabled}
          >
            {loading ? <Loader2 className="animate-spin" /> : icon}
          </Button>
        </TooltipTrigger>
        <TooltipContent>{description}</TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
