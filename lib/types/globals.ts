export type ActionResponseT = {
  success: boolean;
  message: string;
};

export type SharedT = {
  theme: string;
  mode: string;
  today: number;
};

export type SizeT = 'default' | 'sm' | 'lg' | 'icon';
export type VariantT = 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link';

export type SelectOptionT = {
  label: string;
  value: string | number;
};
