export interface IPagination {
  total: number;
  per_page: number;
  total_pages: number;
  current_page: number;
  has_previous_page: boolean;
  has_next_page: boolean;
}
