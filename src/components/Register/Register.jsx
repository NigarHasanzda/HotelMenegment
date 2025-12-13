import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { registerUser, clearMessages } from "../Redux/Features/authSlice";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const RegisterSchema = Yup.object({
  name: Yup.string().required("Ad boş ola bilməz"),
  surname: Yup.string().required("Soyad boş ola bilməz"),
  userName: Yup.string().min(3).required("Username tələb olunur"),
  email: Yup.string().email("Email düzgün deyil").required("Email tələb olunur"),
  password: Yup.string().min(6, "Minimum 6 simvol").required("Şifrə tələb olunur"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password")], "Şifrələr uyğun deyil")
    .required("Təkrar şifrə tələb olunur"),
});

const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error, successMessage } = useSelector((state) => state.auth);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  useEffect(() => {
    if (successMessage) {
      toast.success("Qeydiyyat uğurla tamamlandı. Email təsdiqləyin!");
      dispatch(clearMessages());
      navigate("/login");
    }
    if (error) {
      toast.error(error.errorMessage || error);
      dispatch(clearMessages());
    }
  }, [successMessage, error, dispatch, navigate]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-yellow-50 via-amber-50 to-orange-50">
      <div className="w-full max-w-md p-10 bg-gradient-to-br from-white to-yellow-100 rounded-3xl shadow-2xl border border-yellow-200/50 backdrop-blur-sm">
        <div className="text-center mb-8">
          <div className="inline-block p-4 bg-gradient-to-br from-amber-400 to-orange-400 rounded-2xl shadow-lg mb-4">
            <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
          </div>
          <h2 className="text-4xl font-bold bg-gradient-to-r from-amber-600 to-orange-500 bg-clip-text text-transparent mb-2">
            Qeydiyyat
          </h2>
          <p className="text-amber-700/80 text-sm font-medium">
            Hesab yaradın
          </p>
        </div>

        <Formik
          initialValues={{
            name: "",
            surname: "",
            userName: "",
            email: "",
            password: "",
            confirmPassword: "",
          }}
          validationSchema={RegisterSchema}
          onSubmit={(values) => dispatch(registerUser(values))}
        >
          {() => (
            <Form className="flex flex-col gap-5">
              {/* Name */}
              <div className="flex flex-col">
                <Field
                  name="name"
                  placeholder="Ad"
                  className="w-full px-4 py-3 border-2 border-yellow-200 rounded-xl focus:outline-none focus:border-amber-400 focus:ring-2 focus:ring-amber-200 bg-white text-gray-800 placeholder-amber-400/60 transition-all"
                />
                <ErrorMessage
                  name="name"
                  component="span"
                  className="text-red-600 text-xs mt-1.5 ml-1 font-medium"
                />
              </div>

              {/* Surname */}
              <div className="flex flex-col">
                <Field
                  name="surname"
                  placeholder="Soyad"
                  className="w-full px-4 py-3 border-2 border-yellow-200 rounded-xl focus:outline-none focus:border-amber-400 focus:ring-2 focus:ring-amber-200 bg-white text-gray-800 placeholder-amber-400/60 transition-all"
                />
                <ErrorMessage
                  name="surname"
                  component="span"
                  className="text-red-600 text-xs mt-1.5 ml-1 font-medium"
                />
              </div>

              {/* Username */}
              <div className="flex flex-col">
                <Field
                  name="userName"
                  placeholder="Username"
                  className="w-full px-4 py-3 border-2 border-yellow-200 rounded-xl focus:outline-none focus:border-amber-400 focus:ring-2 focus:ring-amber-200 bg-white text-gray-800 placeholder-amber-400/60 transition-all"
                />
                <ErrorMessage
                  name="userName"
                  component="span"
                  className="text-red-600 text-xs mt-1.5 ml-1 font-medium"
                />
              </div>

              {/* Email */}
              <div className="flex flex-col">
                <Field
                  name="email"
                  type="email"
                  placeholder="Email"
                  className="w-full px-4 py-3 border-2 border-yellow-200 rounded-xl focus:outline-none focus:border-amber-400 focus:ring-2 focus:ring-amber-200 bg-white text-gray-800 placeholder-amber-400/60 transition-all"
                />
                <ErrorMessage
                  name="email"
                  component="span"
                  className="text-red-600 text-xs mt-1.5 ml-1 font-medium"
                />
              </div>

              {/* Password */}
              <div className="flex flex-col relative">
                <Field
                  name="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Şifrə"
                  className="w-full px-4 py-3 border-2 border-yellow-200 rounded-xl focus:outline-none focus:border-amber-400 focus:ring-2 focus:ring-amber-200 bg-white text-gray-800 placeholder-amber-400/60 transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-3 text-amber-500 hover:text-amber-700 transition-colors text-sm font-medium"
                >
                  {showPassword ? "Gizlət" : "Göstər"}
                </button>
                <ErrorMessage
                  name="password"
                  component="span"
                  className="text-red-600 text-xs mt-1.5 ml-1 font-medium"
                />
              </div>

              {/* Confirm Password */}
              <div className="flex flex-col relative">
                <Field
                  name="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="Şifrəni təkrar daxil edin"
                  className="w-full px-4 py-3 border-2 border-yellow-200 rounded-xl focus:outline-none focus:border-amber-400 focus:ring-2 focus:ring-amber-200 bg-white text-gray-800 placeholder-amber-400/60 transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-4 top-3 text-amber-500 hover:text-amber-700 transition-colors text-sm font-medium"
                >
                  {showConfirmPassword ? "Gizlət" : "Göstər"}
                </button>
                <ErrorMessage
                  name="confirmPassword"
                  component="span"
                  className="text-red-600 text-xs mt-1.5 ml-1 font-medium"
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className="bg-gradient-to-r from-amber-400 to-orange-400 text-gray-900 py-3.5 rounded-xl font-semibold hover:from-amber-500 hover:to-orange-500 disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-[1.02] transition-all shadow-lg hover:shadow-xl"
              >
                {loading ? "Göndərilir..." : "Qeydiyyat"}
              </button>
            </Form>
          )}
        </Formik>

        <div className="mt-6 text-center">
          <a href="/login" className="text-sm text-amber-600 hover:text-amber-800 font-medium transition-colors">
            Hesabınız var? Daxil olun
          </a>
        </div>
      </div>
    </div>
  );
};

export default Register;
