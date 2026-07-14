const ENTITLEMENT_STATUS = {
  GRANTED: "granted",
  PARTIAL: "partial",
  NOT_GRANTED: "not_granted",
  INSUFFICIENT_ROLE: "insufficient_role"
} as const;

export default ENTITLEMENT_STATUS;
