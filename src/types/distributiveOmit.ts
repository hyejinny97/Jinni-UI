/** union 각 분기에 Omit을 따로 적용하는 유틸 타입 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type DistributiveOmit<T, K extends keyof any> = T extends any
  ? Omit<T, K>
  : never;
