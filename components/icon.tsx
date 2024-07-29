import { Button } from '@/components/ui/button';
import { SizeType, VariantType } from '@/types';

type IconProps = {
  icon: React.ReactElement;
  size?: SizeType;
  variant?: VariantType;
  className?: string;
  onClick?: () => void;
};

export default function Icon({ icon, size, variant, className, onClick }: IconProps) {
  return (
    <Button
      size={size || 'icon'}
      variant={variant || 'outline'}
      onClick={onClick}
      className={className}
    >
      {icon}
    </Button>
  );
}
