import { Redirect } from "expo-router";
import React, { useEffect, useState } from "react";
import { LogBox } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getBusinessId, getMemberId, getUserId } from "@/utils/utility";

export default function Index() {
  // State สำหรับเก็บสถานะ login และการโหลดข้อมูล
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);

  // ตรวจสอบสถานะ login จาก AsyncStorage เมื่อเปิดแอพ
  useEffect(() => {
    const initialize = async () => {
      try {
        const isLoggedIn = await AsyncStorage.getItem("isLoggedIn");
        // console.log('isLoggedIn:', isLoggedIn);
        if (isLoggedIn === "true") {
          setIsLoggedIn(true);
          getMemberId(); // เรียกใช้ฟังก์ชัน getMemberId เมื่อผู้ใช้ล็อกอินแล้ว
          getBusinessId(); // เรียกใช้ฟังก์ชัน getBusinessId เมื่อผู้ใช้ล็อกอินแล้ว
          getUserId(); // เรียกใช้ฟังก์ชัน getUserId เมื่อผู้ใช้ล็อกอินแล้ว
        }
      } catch (error) {
        console.error("Failed to check login status:", error);
      } finally {
        setIsInitialized(true);
      }
    };

    initialize();
  }, []);

  // รอจนกว่าจะโหลดข้อมูลเสร็จ
  if (!isInitialized) return null;

  LogBox.ignoreAllLogs();

  return isLoggedIn ? <Redirect href="/(tabs)/ProductListScreen" /> : <Redirect href="/(auth)/login" />;
}
