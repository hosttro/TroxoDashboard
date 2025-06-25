import React, { createContext, useContext, useReducer, useMemo } from "react";
import PropTypes from "prop-types";

// --------------------------------------
// 1. Initial State
// --------------------------------------
const initialState = {
  user: null,

  // Personal Sign Up
  personalSignUp: {
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    countryCode: "+966",
    password: "",
    confirmPassword: "",
    policyCheck: false,
    file: null,
  },

  // Business Sign Up
  businessSignUp: {
    entityClassification: "",
    commercialNumber: "",
    taxNumber: "",
    websitePrefix: "http://",
    websiteLink: "",
    storePlatform: "",
  },

  // تخزين البريد أو الجوال عند طلب إعادة التعيين
  forgetPassword: {
    emailOrPhone: "",
  },

  storeId: "",
};

// --------------------------------------
// 2. Reducer
// --------------------------------------
function appReducer(state, action) {
  switch (action.type) {
    // Set user after login
    case "SET_USER":
      return {
        ...state,
        user: action.payload,
      };

    // Update personal sign up field
    case "UPDATE_SIGNUP_FIELD":
      return {
        ...state,
        personalSignUp: {
          ...state.personalSignUp,
          [action.field]: action.value,
        },
      };

    // Reset personal form
    case "RESET_SIGNUP":
      return {
        ...state,
        personalSignUp: initialState.personalSignUp,
      };

    // Update business sign up field
    case "UPDATE_BUSINESS_FIELD":
      return {
        ...state,
        businessSignUp: {
          ...state.businessSignUp,
          [action.field]: action.value,
        },
      };

    // Reset business form
    case "RESET_BUSINESS":
      return {
        ...state,
        businessSignUp: initialState.businessSignUp,
      };

    // ✅ Clear both personal + business forms
    case "CLEAR_FORM":
      return {
        ...state,
        personalSignUp: initialState.personalSignUp,
        businessSignUp: initialState.businessSignUp,
        storeId: initialState.storeId
      };

    // ضبط قيمة emailOrPhone لصفحة ForgetPassword → ConfirmEmail
    case "SET_FORGOT_EMAIL":
      return {
        ...state,
        forgetPassword: {
          emailOrPhone: action.payload,
        },
      };

    // إعادة تهيئة حالة forgetPassword (اختياري)
    case "RESET_FORGOT_EMAIL":
      return {
        ...state,
        forgetPassword: initialState.forgetPassword,
      };

       case "SET_STORE_ID":
      return {
        ...state,
        storeId: action.payload
      };

    default:
      throw new Error(`Unhandled action type: ${action.type}`);
  }
}

// --------------------------------------
// 3. Create Context
// --------------------------------------
const AppContext = createContext();

// --------------------------------------
// 4. Context Provider
// --------------------------------------
export const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(appReducer, initialState);
  const contextValue = useMemo(() => ({ state, dispatch }), [state]);

  return (
    <AppContext.Provider value={contextValue}>{children}</AppContext.Provider>
  );
};

AppProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

// --------------------------------------
// 5. Custom Hook
// --------------------------------------
export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useAppContext must be used within an AppProvider");
  }
  return context;
};
