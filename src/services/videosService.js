import { createClient } from "@supabase/supabase-js";
import { useState } from "react";

const PROJECT_URL = "https://eeixiqoaxpvyhdmkhaww.supabase.co";
const PUBLIC_API_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVlaXhpcW9heHB2eWhkbWtoYXd3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2NjgzNjcxODgsImV4cCI6MTk4Mzk0MzE4OH0.7uwl8AgCtQIbiyP46GMq1cP7mhxescjZCxvXrPZpuOg";
const supabase = createClient(PROJECT_URL, PUBLIC_API_KEY);

export function videoService() {
  return {
    getAllVideos() {
      return supabase
            .from("tb_video")
            .select("*");
    },
  };
}
