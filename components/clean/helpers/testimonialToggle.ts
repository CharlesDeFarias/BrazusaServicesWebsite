export type TestimonialCategory = 'str' | 'property' | 'offices' | 'homes' | 'other'

export function toggleCategory(
  current: TestimonialCategory | null,
  clicked: TestimonialCategory
): TestimonialCategory | null {
  return current === clicked ? null : clicked
}
