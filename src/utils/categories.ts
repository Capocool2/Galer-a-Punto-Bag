import { 
  Bed, 
  Wind, 
  Blinds, 
  Shirt,
  PilotIcon as Pillow,
  Table2,
  Layers,
  Sofa,
  LucideIcon
} from 'lucide-react';

export interface Category {
  id: string;
  name: string;
  icon: LucideIcon;
  color: string;
  description: string;
}

export const categories: Category[] = [
  {
    id: 'sabanas',
    name: 'Sábanas',
    icon: Bed,
    color: '#3498db',
    description: 'Sábanas suaves y duraderas para un descanso perfecto'
  },
  {
    id: 'toallas',
    name: 'Toallas',
    icon: Wind,
    color: '#2ecc71',
    description: 'Toallas absorbentes y de alta calidad'
  },
  {
    id: 'cortinas',
    name: 'Cortinas',
    icon: Blinds,
    color: '#9b59b6',
    description: 'Cortinas elegantes para decorar tus espacios'
  },
  {
    id: 'cobijas',
    name: 'Cobijas',
    icon: Layers,
    color: '#e74c3c',
    description: 'Cobijas cálidas y confortables'
  },
  {
    id: 'almohadas',
    name: 'Almohadas',
    icon: Sofa,
    color: '#f39c12',
    description: 'Almohadas ergonómicas para tu máximo confort'
  },
  {
    id: 'manteles',
    name: 'Manteles',
    icon: Table2,
    color: '#1abc9c',
    description: 'Manteles decorativos para tus mesas'
  },
  {
    id: 'edredones',
    name: 'Edredones',
    icon: Shirt,
    color: '#e67e22',
    description: 'Edredones suaves y elegantes'
  },
  {
    id: 'colchas',
    name: 'Colchas',
    icon: Bed,
    color: '#34495e',
    description: 'Colchas decorativas de alta calidad'
  }
];

export function getCategoryById(id: string): Category | undefined {
  return categories.find(cat => cat.id === id);
}

export function getCategoryColor(categoryId: string): string {
  const category = getCategoryById(categoryId);
  return category?.color || '#3498db';
}
