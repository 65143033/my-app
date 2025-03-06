"use client";
import Input from "@/app/components/material/input";
import { fetchActionApi } from "@/app/utils/action";
import { useState } from "react";

export default function Register() {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const regsister = async (e: React.FormEvent) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            alert("รหัสผ่านไม่ตรงกัน")
            return;
        }
        let body = {
            username: username,
            email: email,
            password: password
        };
        const res = await fetchActionApi("/api/auth/local/register",{
            method: "POST",
            body: JSON.stringify(body)
            
        });
        if(res) {
            if (res.status === 200) {
                window.location.href = "/login";
            } else {
                alert("สมัครสมาชิกไม่สําเร็จ");
            }
        }
        
    }
    return (
<div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-sm">
        <h1 className="text-2xl font-semibold text-center text-gray-800 mb-6">
          สมัครสมาชิก
        </h1>
        <form onSubmit={(e) => regsister(e)}>
        <Input type="text" 
          id="username" 
          value={username} 
          label="ชื่อผู้ใช้" 
          onChange={(e) => setUsername(e.target.value)} required 
          />
        <Input type="email" 
          id="email" 
          value={email} 
          label="อีเมล" 
          onChange={(e) => setEmail(e.target.value)} required 
          />
          <Input type="password"
          id="password"
          value={password}
          label="รหัสผ่าน"
          onChange={(e) => setPassword(e.target.value)} required 
          />
             <div className="mb-6">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              ยืนยันรหัสผ่าน
            </label>
            <input
              type="password"
              id="confitmPassword"
              name="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full py-2 px-4 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            สมัครเข้าใช้งาน    
          </button>
        </form>
      </div>
    </div>

  );
}