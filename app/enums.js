const ENUMS = {
  DYNAMIC_STATUS: {
    NONE: 0,
    BOOTING: 1,
    READY: 2,
    SHUTTING_DOWN: 3,
    DOWNLOADING: 4,
    INSTALLING: 5,
    LAUNCHING: 6,
    HOOKING: 7
  },

  PAYMENT_DURATION: {
    MONTHLY: 1,
    QUATERLY: 3,
    HALFYEARLY: 6,
    YEARLY: 10
  },

  PAYMENT_SOURCE: {
    PAYPAL: 1,
    STRIPE_MANUAL: 2,
    BANK_TRANSFER: 3,
    MANUAL: 4,
    STRIPE_RECURRING: 5
  },

  COLLABORATION_ROLE: {
    ADMIN: 0,
    MANAGER: 1,
    READ_ONLY: 2
  },

  PLAN_TYPE: {
    PER_SCAN: 0,
    REGULAR_USER: 1
  },

  USER_ROLE: {
    CO_FOUNDER: 1,
    EMPLOYEE: 2,
    PARTNER: 3,
    REGULAR: 4
  },

  USER_DEPARTMENT: {
    TECHNOLOGY: 1,
    SECURITY: 2,
    SALES: 3,
    MARKETING: 4,
    DESIGN: 5
  },

  ATTACK_VECTOR: {
    NETWORK: "N",
    ADJACENT: "A",
    LOCAL: "L",
    PHYSICAL: "P"
  },

  ATTACK_COMPLEXITY: {
    LOW: "L",
    HIGH: "H"
  },

  PRIVILEGES_REQUIRED: {
    NONE: "N",
    LOW: "L",
    HIGH: "H"
  },

  USER_INTERACTION: {
    NOT_REQUIRED: "N",
    REQUIRED: "R"
  },

  SCOPE: {
    UNCHANGED: "U",
    CHANGED: "C"
  },

  CONFIDENTIALITY_IMPACT: {
    NONE: "N",
    LOW: "L",
    HIGH: "H"
  },

  INTEGRITY_IMPACT: {
    NONE: "N",
    LOW: "L",
    HIGH: "H"
  },

  AVAILABILITY_IMPACT: {
    NONE: "N",
    LOW: "L",
    HIGH: "H"
  },

  ANALYSIS_STATUS: {
     ERROR: 0,
     WAITING: 1,
     RUNNING: 2,
     COMPLETED: 3
   },

  OWASP_CATEGORIES: {
    M1_2013: 1,
    M2_2013: 2,
    M3_2013: 3,
    M4_2013: 4,
    M5_2013: 5,
    M6_2013: 6,
    M7_2013: 7,
    M8_2013: 8,
    M9_2013: 9,
    M10_2013: 10,
    A1_2013: 11,
    A2_2013: 12,
    A3_2013: 13,
    A4_2013: 14,
    A5_2013: 15,
    A6_2013: 16,
    A7_2013: 17,
    A8_2013: 18,
    A9_2013: 19,
    A10_2013: 20
  }
};

// Populate `CHOICES`
for (let enumName in ENUMS) {
  const enumValues = ENUMS[enumName];
  const choices = [];
  const values = [];
  enumValues['UNKNOWN'] = -1;
  for (let key in enumValues) {
    const value = enumValues[key];
    choices.push({key, value});
    values.push(value);
  }
  ENUMS[enumName]['CHOICES'] = choices;
  ENUMS[enumName]['VALUES'] = values;
}

export default ENUMS;
