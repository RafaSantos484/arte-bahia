export interface Table {
  insert(data: any): Promise<string | null>;
  toJson(): Record<string, any>;
}
