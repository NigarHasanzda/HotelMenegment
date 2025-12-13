import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginUser, clearMessages } from "../Redux/Features/authSlice";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const LoginSchema = Yup.object({
  userNameOrEmail: Yup.string().required("Username və ya Email tələb olunur"),
  password: Yup.string().required("Şifrə tələb olunur"),
});

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error, token } = useSelector((state) => state.auth);
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    if (token) {
      toast.success("Uğurla daxil oldunuz");
      navigate("/");
    }
    if (error) {
      toast.error(error.errorMessage || error);
      dispatch(clearMessages());
    }
  }, [token, error, navigate, dispatch]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50">
      <div className="w-full max-w-md p-10 bg-gradient-to-br from-white to-amber-50/30 rounded-3xl shadow-2xl border border-amber-100/50 backdrop-blur-sm">
        <div className="text-center mb-8">
          <div className="inline-block p-4 bg-gradient-to-br from-amber-600 to-orange-700 rounded-2xl shadow-lg mb-4">
            <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
          </div>
          <h2 className="text-4xl font-bold bg-gradient-to-r from-amber-700 to-orange-800 bg-clip-text text-transparent mb-2">
            Xoş Gəldiniz
          </h2>
          <p className="text-amber-700/70 text-sm font-medium">
            Hesabınıza daxil olun
          </p>
        </div>

        <Formik
          initialValues={{ userNameOrEmail: "", password: "", isRemembered: false }}
          validationSchema={LoginSchema}
          onSubmit={(values) => dispatch(loginUser(values))}
        >
          {() => (
            <Form className="flex flex-col gap-5">
              {/* Username or Email */}
              <div className="flex flex-col">
                <div className="relative">
                  <div className="absolute left-4 top-3.5 text-amber-600">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                  </div>
                  <Field
                    name="userNameOrEmail"
                    type="text"
                    placeholder="İstifadəçi adı və ya Email"
                    className="w-full pl-12 pr-4 py-3 border-2 border-amber-200 rounded-xl focus:outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-200 bg-white/80 text-gray-800 placeholder-amber-400/60 transition-all"
                  />
                </div>
                <ErrorMessage
                  name="userNameOrEmail"
                  component="span"
                  className="text-red-600 text-xs mt-1.5 ml-1 font-medium"
                />
              </div>

              {/* Password */}
              <div className="flex flex-col">
                <div className="relative">
                  <div className="absolute left-4 top-3.5 text-amber-600">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                  </div>
                  <Field
                    name="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Şifrə"
                    className="w-full pl-12 pr-16 py-3 border-2 border-amber-200 rounded-xl focus:outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-200 bg-white/80 text-gray-800 placeholder-amber-400/60 transition-all"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-3 text-amber-600 hover:text-amber-800 transition-colors text-sm font-medium"
                  >
                    {showPassword ? "Gizlət" : "Göstər"}
                  </button>
                </div>
                <ErrorMessage
                  name="password"
                  component="span"
                  className="text-red-600 text-xs mt-1.5 ml-1 font-medium"
                />
              </div>

              {/* Remember Me */}
              <label className="flex items-center gap-2.5 text-sm text-amber-800 cursor-pointer group">
                <Field 
                  type="checkbox" 
                  name="isRemembered" 
                  className="w-4 h-4 rounded border-2 border-amber-300 text-amber-600 focus:ring-2 focus:ring-amber-200 cursor-pointer"
                />
                <span className="group-hover:text-amber-900 transition-colors font-medium">Məni xatırla</span>
              </label>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className="bg-gradient-to-r from-amber-600 to-orange-700 text-white py-3.5 rounded-xl font-semibold hover:from-amber-700 hover:to-orange-800 disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-[1.02] transition-all shadow-lg hover:shadow-xl"
              >
                {loading ? (
                  <span className="flex items-center justify-center gap-2">
                    <svg className="animate-spin h-5 w-5" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Gözləyin...
                  </span>
                ) : (
                  "Daxil ol"
                )}
              </button>
            </Form>
          )}
        </Formik>

        <div className="mt-6 text-center">
          <a href="#" className="text-sm text-amber-700 hover:text-amber-900 font-medium transition-colors">
            Şifrənizi unutmusunuz?
          </a>
        </div>
      </div>
    </div>
  );
};

export default Login;