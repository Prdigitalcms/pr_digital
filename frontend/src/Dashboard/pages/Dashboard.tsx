import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { useEffect, useState } from "react";
import { getAuth } from "firebase/auth";

interface DashboardStats {
  releases: number;
  artists: number;
}

interface EarningData {
  name: string;
  amount: number;
}

export default function Dashboard() {
  const stats: DashboardStats = {
    releases: 0,
    artists: 0
  };

  let earningData: EarningData[] = [
    { name: 'Jan', amount: 0 },
    { name: 'Feb', amount: 0 },
    { name: 'Mar', amount: 0 },
    { name: 'Apr', amount: 0 },
    { name: 'May', amount: 0 },
    { name: 'Jun', amount: 0 }
  ];

  const topMixes = [
    // {
    //   title: "Main Jahan Rahoon",
    //   artist: "Yasser Desai",
    //   cover: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=200&h=200&fit=crop"
    // },
    // {
    //   title: "Samastipur Jila Ke",
    //   artist: "Pyare Arjun, Sapna Raj",
    //   cover: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=200&h=200&fit=crop"
    // }
  ];
  const Dashboard = () => {
  const [userName, setUserName] = useState("User");

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setUserName(user.displayName || "User");
      }
    });
    
 return () => unsubscribe();
  }, []);

  return (
    <div className="p-6">
      <div className="mb-8">
        <h1 className="text-2xl font-semibold mb-2 dark:text-white">Hi,{userName}</h1>
        <p className="text-gray-600 dark:text-gray-300">Welcome to PrDigitalCms</p>
      </div>

      <div className="grid grid-cols-2 gap-6 mb-8">
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
          <h2 className="text-gray-600 dark:text-gray-400 mb-2">Releases</h2>
          <div className="flex items-center">
            <span className="text-3xl font-bold dark:text-white">{stats.releases}</span>
            <span className="ml-2 text-green-500 text-sm">↑ 0% Since last week</span>
          </div>
        </div>
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
          <h2 className="text-gray-600 dark:text-gray-400 mb-2">Artists</h2>
          <div className="flex items-center">
            <span className="text-3xl font-bold dark:text-white">{stats.artists}</span>
          </div>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow mb-8">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold dark:text-white">Earning over time (USD)</h2>
          <div className="flex items-center gap-4">
            <input
              type="date"
              className="border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 dark:bg-gray-700 dark:text-white"
              placeholder="Start month"
            />
            <input
              type="date"
              className="border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 dark:bg-gray-700 dark:text-white"
              placeholder="End month"
            />
          </div>
        </div>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={earningData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="amount" stroke="#8884d8" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
        <h2 className="text-xl font-semibold mb-6 dark:text-white">Your top mixes</h2>
        <div className="grid grid-cols-6 gap-4">
          {topMixes.map((mix, index) => (
            <div key={index} className="relative group">
              <img
                src={mix.cover}
                alt={mix.title}
                className="w-full aspect-square object-cover rounded-lg"
              />
              <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black to-transparent text-white">
                <h3 className="font-medium truncate">{mix.title}</h3>
                <p className="text-sm text-gray-300 truncate">{mix.artist}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}}