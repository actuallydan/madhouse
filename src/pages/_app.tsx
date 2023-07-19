import { type AppType } from "next/app";
import { api } from "~/utils/api";
import "~/styles/globals.css";
import { Inter } from "next/font/google";

const atkinson = Inter({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin-ext", "latin"],
});

const MyApp: AppType = ({ Component, pageProps }) => {
  return (
    <div className={atkinson.className}>
      <Component {...pageProps} />
    </div>
  );
};

export default api.withTRPC(MyApp);
