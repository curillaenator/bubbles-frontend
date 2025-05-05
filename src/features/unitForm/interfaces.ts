import type { AppUnitGalleryItem, AppUnitFields } from '@src/entities/unit';

interface UnitFormGalleryProps {
  unitId: string;
  items: AppUnitGalleryItem[];
  getUnitValues: () => Omit<AppUnitFields, 'gallery'>;
  updateExistingUnit: Function;
  disabled?: boolean;
}

interface UnitFormItemEditorProps extends UnitFormGalleryProps {
  currentEditItem: AppUnitGalleryItem | null;
  toggleUnitEditor: (unit: AppUnitGalleryItem | null) => void;
}

export type { UnitFormGalleryProps, UnitFormItemEditorProps };
