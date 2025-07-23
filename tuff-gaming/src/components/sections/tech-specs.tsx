"use client";

import Image from "next/image";

export function TechSpecs() {
  const compatibilitySpecs = [
    { platform: "PlayStation", version: "5" },
    { platform: "Windows", version: "7+" },
    { platform: "XBOX", version: "SERIES X/S" },
    { platform: "MacOS", version: "CATALINA+" },
  ];

  const additionalFeatures = [
    { label: "Dimensions", value: '6.3 x 4.17 x 2.6"' },
    { label: "Ports", value: "USB-C, 3.5mm Stereo Headset Jack" },
    { label: "Thumbstick Layout", value: "Symmetrical" },
    { label: "Wireless Range", value: "Up to 45 feet" },
    { label: "Warranty", value: "1 year (12 months)" },
  ];

  const boxContents = [
    {
      name: "Reflex",
      image:
        "https://scufgaming.com/media/prismic/e8b4db7a-f06c-4408-b68f-2a5eb2a8b950_reflex_black_front_playstation_controller_750x750.png",
    },
    {
      name: "6ft/2m USB-C Cable",
      image:
        "https://scufgaming.com/media/prismic/0fad69a3-a94a-4d4c-b8ca-cfdd88d73864_reflex_playstaion_5_usb_c_charger_cable_750x750.png",
    },
    {
      name: "Black Universal Case",
      image:
        "https://scufgaming.com/media/prismic/56f7cd25-ed0c-4bbd-a871-2dd4a70158f1_reflex_ts_case_witb_playstation_controller_750x750.png",
    },
  ];

  return (
    <section className="bg-gray-50 py-16">
      <div className="container mx-auto px-6 md:px-8 lg:px-12">
        {/* Header */}
        <div className="text-center mb-18">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-800 uppercase tracking-wider mb-4">
            TECH SPECS
          </h2>
        </div>

        <div className="max-w-6xl mx-auto">
          {/* Specs Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
            {/* Compatibility */}
            <div>
              <h3 className="text-sm font-semibold text-gray-600 uppercase tracking-wide border-b border-gray-300 pb-2 mb-6">
                COMPATIBILITY
              </h3>
              <div className="space-y-4">
                {compatibilitySpecs.map((spec, index) => (
                  <div key={index}>
                    <div className="text-sm text-gray-600 mb-1">
                      {spec.platform}
                    </div>
                    <div className="text-2xl font-bold text-gray-900">
                      {spec.version}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Weight & Connectivity */}
            <div>
              <h3 className="text-sm font-semibold text-gray-600 uppercase tracking-wide border-b border-gray-300 pb-2 mb-6">
                WEIGHT
              </h3>
              <div className="mb-6">
                <div className="text-4xl font-bold text-gray-900 mb-1">300</div>
                <div className="text-sm text-gray-600">Grams</div>
              </div>

              <h4 className="text-sm font-semibold text-gray-600 uppercase tracking-wide mb-4">
                CONNECTIVITY
              </h4>
              <div>
                <div className="text-xl font-bold text-gray-900 mb-1">
                  WIRELESS
                </div>
                <div className="text-xl font-bold text-gray-900 mb-1">
                  (BLUETOOTH OR DONGLE)
                </div>
                <div className="text-sm text-gray-600">Wired (USB-C)</div>
              </div>
            </div>

            {/* Additional Features */}
            <div>
              <h3 className="text-sm font-semibold text-gray-600 uppercase tracking-wide border-b border-gray-300 pb-2 mb-6">
                ADDITIONAL FEATURES
              </h3>
              <div className="space-y-3">
                {additionalFeatures.map((feature, index) => (
                  <div key={index}>
                    <div className="text-sm font-semibold text-gray-600 mb-1">
                      {feature.label}:
                    </div>
                    <div className="text-sm text-gray-900">{feature.value}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* What's in the Box */}
          <div>
            <h3 className="text-sm font-semibold text-gray-600 uppercase tracking-wide border-b border-gray-300 pb-2 mb-8">
              WHAT&apos;S IN THE BOX
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {boxContents.map((item, index) => (
                <div key={index} className="text-center">
                  <div className="bg-white rounded-lg p-8 mb-4 shadow-sm aspect-square flex items-center justify-center overflow-hidden">
                    <Image
                      src={item.image}
                      alt={item.name}
                      width={300}
                      height={300}
                      className="w-full h-full object-contain scale-125"
                    />
                  </div>
                  <h4 className="text-sm font-semibold text-gray-900">
                    {item.name}
                  </h4>
                  {item.name === "Black Universal Case" && (
                    <>
                      <div className="text-sm text-gray-600 mt-1">
                        Additional Thumbsticks
                      </div>
                      <div className="text-xs text-gray-500 mt-1">
                        Thumbstick sizes and shapes may vary
                      </div>
                    </>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
