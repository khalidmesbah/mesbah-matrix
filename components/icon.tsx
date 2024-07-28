import { Button } from '@/components/ui/button';

type IconProps = {
  icon: React.ReactElement;
  size?: 'default' | 'sm' | 'lg' | 'icon';
  variant?: 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link';
  onClick?: () => void;
};

export default function Icon({ icon, size, variant, onClick }: IconProps) {
  return (
    <Button size={size || 'icon'} variant={variant || 'outline'} onClick={onClick}>
      {icon}
    </Button>
  );
}
