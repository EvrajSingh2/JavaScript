// enum
export enum Category {
  noCategory = "",
  Food = "Food",
  Travel = "Travel",
  Work = "Work",
  Gym = "Gym",
  Other = "Other"
}

export enum FilterValue {
  All = "All",
  Food = "Food",
  Travel = "Travel",
  Work = "Work",
  Gym = "Gym",
  Other = "Other"
}

export interface Expense {
  id: number
  title: string
  amount: number
  category: Category
}