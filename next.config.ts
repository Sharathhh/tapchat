import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactStrictMode: false,
  
  async redirects(){
    return [
      {
        source: "/",
        destination: "/conversations",
        permanent:true
      },
    ]


  }
  
};

export default nextConfig;
