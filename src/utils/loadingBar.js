import NProgress from "nprogress";
import "nprogress/nprogress.css";

NProgress.configure({
  showSpinner: false,
  trickleSpeed: 150,
});

export const startLoading = () => NProgress.start();
export const stopLoading = () => NProgress.done();
