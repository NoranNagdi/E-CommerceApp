import { Headphones, RefreshCw, Truck } from "lucide-react";
import React from "react";

export default function Features() {
  return (
    <section className="py-12 mb-20">
      <div className="container grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
        {/* Feature 1 */}
        <div className="flex flex-col items-center">
          <div className="w-16 h-16 rounded-full bg-gray-300 flex items-center justify-center">
            <div className="w-12 h-12 rounded-full bg-black flex items-center justify-center">
              <Truck className="text-white w-6 h-6" />
            </div>
          </div>
          <h3 className="mt-4 font-bold text-lg">FREE AND FAST DELIVERY</h3>
          <p className="text-gray-600 text-sm">
            Free delivery for all orders over $140
          </p>
        </div>

        {/* Feature 2 */}
        <div className="flex flex-col items-center">
          <div className="w-16 h-16 rounded-full bg-gray-300 flex items-center justify-center">
            <div className="w-12 h-12 rounded-full bg-black flex items-center justify-center">
              <Headphones className="text-white w-6 h-6" />
            </div>
          </div>
          <h3 className="mt-4 font-bold text-lg">24/7 CUSTOMER SERVICE</h3>
          <p className="text-gray-600 text-sm">
            Friendly 24/7 customer support
          </p>
        </div>

        {/* Feature 3 */}
        <div className="flex flex-col items-center">
          <div className="w-16 h-16 rounded-full bg-gray-300 flex items-center justify-center">
            <div className="w-12 h-12 rounded-full bg-black flex items-center justify-center">
              <RefreshCw className="text-white w-6 h-6" />
            </div>
          </div>
          <h3 className="mt-4 font-bold text-lg">MONEY BACK GUARANTEE</h3>
          <p className="text-gray-600 text-sm">
            We return money within 30 days
          </p>
        </div>
      </div>
    </section>
  );
}
