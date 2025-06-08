import React from "react";

const SignUpPage = () => {
  return (
    <div
      className="bg-slate-50"
      style={{ fontFamily: 'Inter, "Noto Sans", sans-serif' }}
    >
      <div className="relative flex flex-col  overflow-x-hidden group/design-root">
        <div className="layout-container flex flex-col h-full grow">
        

          <main className="flex flex-1 items-center justify-center py-12 sm:py-16 lg:py-20">
            <div className="w-full max-w-md px-4 sm:px-6 space-y-8">
              <div className="text-center">
                <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
                  Create your Account
                </h2>
                <p className="mt-3 text-slate-600">
                  Join ChatAI and start your AI-enhanced conversations.
                </p>
              </div>

              <form className="space-y-6">
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-slate-700"
                  >
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    placeholder="Enter your name"
                    className="form-input mt-1 block w-full rounded-lg border-slate-300 bg-slate-50 px-4 py-3 text-slate-900 shadow-sm placeholder:text-slate-400 focus:border-blue-500 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-slate-700"
                  >
                    Email address
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    placeholder="Enter your email"
                    className="form-input mt-1 block w-full rounded-lg border-slate-300 bg-slate-50 px-4 py-3 text-slate-900 shadow-sm placeholder:text-slate-400 focus:border-blue-500 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium text-slate-700"
                  >
                    Password
                  </label>
                  <input
                    type="password"
                    id="password"
                    name="password"
                    required
                    placeholder="Enter your password"
                    className="form-input mt-1 block w-full rounded-lg border-slate-300 bg-slate-50 px-4 py-3 text-slate-900 shadow-sm placeholder:text-slate-400 focus:border-blue-500 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <button
                    type="submit"
                    className="flex w-full justify-center rounded-lg bg-blue-600 px-4 py-3 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
                  >
                    Sign up
                  </button>
                </div>
              </form>

              <p className="mt-8 text-center text-sm text-slate-600">
                Already have an account?{" "}
                <a
                  href="#"
                  className="font-medium text-blue-600 hover:text-blue-500 hover:underline"
                >
                  Log in
                </a>
              </p>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;
