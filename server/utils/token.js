// export const setAuthCookies = (res, accessToken, refreshToken) => {
//   const isProd = process.env.NODE_ENV === "production";

//   res.cookie("accessToken", accessToken, {
//     httpOnly: true,
//     secure: true,          //changed
//   sameSite: "none",
//     maxAge: 15 * 60 * 1000,
//   });

//   res.cookie("refreshToken", refreshToken, {
//     httpOnly: true,
//     secure: true,        //changed
//   sameSite: "none",
//     maxAge: 30 * 24 * 60 * 60 * 1000,
//   });
// };

// export const setAuthCookies = (res, accessToken, refreshToken) => {
//   const isProd = process.env.NODE_ENV === "production";

//   res.cookie("accessToken", accessToken, {
//     httpOnly: true,
//     secure: isProd,              //http ke liye false, https ke liye true
//     sameSite: isProd ? "none" : "lax",   //production me none, development me lax
//     maxAge: 15 * 60 * 1000,
//   });

//   res.cookie("refreshToken", refreshToken, {
//     httpOnly: true,
//     secure: isProd,
//     sameSite: isProd ? "none" : "lax",
//     maxAge: 30 * 24 * 60 * 60 * 1000,
//   });
// };

export const setAuthCookies = (res, accessToken, refreshToken) => {
  res.cookie("accessToken", accessToken, {
    httpOnly: true,
    secure: true,
    sameSite: "none",
    path: "/",
    maxAge: 1 * 60 * 1000,
  });

  res.cookie("refreshToken", refreshToken, {
    httpOnly: true,
    secure: true,
    sameSite: "none",
    path: "/",
    maxAge: 15 * 24 * 60 * 60 * 1000,
  });
};
