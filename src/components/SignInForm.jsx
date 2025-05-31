"use client";

import { FaGoogle, FaGithub } from "react-icons/fa";

import { signIn, useSession } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { signUp } from "@/lib/actions/signup/actions";
import { FaEye } from "react-icons/fa";
import { useCart } from "@/context/cartContext";
import { Loader } from "@/components/Loader";

const SignInForm = () => {
  const [signUpState, setSignUpState] = useState(false);
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [reTypedPassword, setReTypedPassword] = useState("");
  let isTypedReTypedPassSame = password === reTypedPassword;
  const isPasswordLengthValid = password.length >= 6;
  const isValidPass = isTypedReTypedPassSame && isPasswordLengthValid;
  const [isFocusedRetype, setIsFocusedRetype] = useState(false);
  const [isFocusedtype, setIsFocusedtype] = useState(false);
  const [userIsLoggedIn, setUserIsLoggedIn] = useState(false);

  const { data: session } = useSession();

  // inside a useEffect or after login
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirect = searchParams.get("redirect");
  // console.log(redirect);
  const { loading } = useCart();

  const handleSubmitSignIn = async (e) => {
    e.preventDefault();

    const res = await signIn("credentials", {
      redirect: false,
      email,
      password,
    });

    // console.log(res);

    if (res?.error) {
      alert("Invalid credentials");
    }
  };

  useEffect(() => {
    if (session?.user) {
      router.push(redirect || "/");
    }
  }, [session, redirect]);

  const handleSubmitSignUp = async (e) => {
    e.preventDefault();
    const actionRes = await signUp({ name, email, password, reTypedPassword });
    console.log(actionRes);

    if (!actionRes.success && actionRes.message == "duplicate user") {
      alert("You have already registerd please sign in");
      setSignUpState(false);
    }

    const res = await signIn("credentials", {
      redirect: false,
      email,
      password,
    });

    console.log(res);
    if (res?.ok) {
      router.push("/");
    } else {
      alert("Invalid credentials");
    }
  };

  return !loading ? (
    <div className="flex flex-col gap-3 text-black mx-10 mt-24 items-center h-[80vh] justify-center">
      {signUpState ? (
        <div className="signup-form w-full">
          <h2 className="font-semibold text-lg text-center">Sign Up</h2>
          <form
            onSubmit={handleSubmitSignUp}
            className="flex flex-col gap-3 w-full max-w-lg px-4 sm:px-6 md:px-8 lg:px-10 mx-auto"
          >
            <input
              type="text"
              placeholder="Enter your Full Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="border p-2 rounded"
              required
            />
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="border p-2 rounded"
              required
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onFocus={() => setIsFocusedtype(true)}
              onChange={(e) => setPassword(e.target.value)}
              className="border p-2 rounded"
              required
            />

            <input
              type="password"
              placeholder="Retype Password"
              value={reTypedPassword}
              onFocus={() => setIsFocusedRetype(true)}
              onChange={(e) => setReTypedPassword(e.target.value)}
              className="border p-2 rounded"
              required
            />
            {isFocusedtype && !isPasswordLengthValid && (
              <p className="text-red-500 text-sm">
                Password must be at least 6 characters
              </p>
            )}

            {isFocusedRetype && !isTypedReTypedPassSame && (
              <p className="text-red-500 text-sm">Passwords must be same</p>
            )}

            <button
              type="submit"
              disabled={!isValidPass}
              className={`px-3 py-2 text-white rounded ${
                isValidPass ? "bg-primary" : "bg-gray-400 cursor-not-allowed"
              }`}
            >
              Sign Up
            </button>
          </form>
        </div>
      ) : (
        <div className="signin-form w-full">
          <h2 className="font-semibold text-lg text-center">Sign in</h2>
          <form
            onSubmit={handleSubmitSignIn}
            className="flex flex-col gap-3 w-full max-w-lg px-4 sm:px-6 md:px-8 lg:px-10 mx-auto"
          >
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="border p-2 rounded"
              required
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="border p-2 rounded"
              required
            />

            <button
              type="submit"
              className="px-3 py-2 bg-primary text-white rounded"
            >
              Sign In
            </button>
          </form>
        </div>
      )}

      <p
        onClick={() => setSignUpState(!signUpState)}
        className="underline cursor-pointer"
      >
        {signUpState ? "Already have an account" : "Create a new account"}
      </p>

      <span>Or</span>
      <div className="flex flex-col gap-3">
        <button
          className="flex gap-2 items-center bg-white px-3 py-2 rounded font-semibold"
          onClick={() => signIn("github")}
        >
          <FaGithub size={20} />
          Continue with Github
        </button>
        <button
          className="flex gap-2 items-center bg-white px-3 py-2 rounded font-semibold"
          onClick={() => signIn("google")}
        >
          <FaGoogle size={20} />
          Continue with Google
        </button>
      </div>
    </div>
  ) : (
    <div className="flex items-center justify-center h-[80vh]">
      <Loader />
    </div>
  );
};

export default SignInForm;
