// https://github.com/w3c/webappsec-permissions-policy/blob/main/features.md
// https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Permissions-Policy#directives
// https://source.chromium.org/chromium/chromium/src/+/main:third_party/blink/public/common/permissions_policy/policy_helper_public.h
// https://source.chromium.org/chromium/chromium/src/+/main:third_party/blink/renderer/modules/permissions/permission_descriptor.idl
const PERMISSIONS = [
    // Camera & Audio
    // https://www.w3.org/TR/mediacapture-streams/
    "device-info",
    "camera",
    "microphone",

    // speaker-select 
    "speaker",
    "speaker-selection",

    // Geolocation
    // https://www.w3.org/TR/geolocation/
    "geolocation",

    // USB
    // https://wicg.github.io/webusb/
    "usb",

    // Only on Isolated Web Apps (IWA)
    "usb-unrestricted",

    // Generic Sensor API
    // https://www.w3.org/TR/generic-sensor/
    // Just low-level: https://w3c.github.io/motion-sensors/
    "accelerometer",
    "gyroscope",
    "ambient-light-sensor",
    "magnetometer", 

    // Compute Pressure
    // https://www.w3.org/TR/compute-pressure/
    "compute-pressure", 

    // Notification
    // https://notifications.spec.whatwg.org/
    "notifications",

    // Bluetooth
    // https://webbluetoothcg.github.io/web-bluetooth/
    "bluetooth",

    // Media Session
    // https://www.w3.org/TR/mediasession/
    "mediasession",

    // Encrypted media
    // https://w3c.github.io/encrypted-media/
    "encrypted-media",

    // BatteryAPI
    // https://w3c.github.io/battery/
    "battery",

    // Screen Capture
    // https://www.w3.org/TR/screen-capture/
    "display-capture",

    // Fullscreen API
    // https://fullscreen.spec.whatwg.org/
    "fullscreen",

    // WebHID
    // https://wicg.github.io/webhid/
    "hid",

    // Idle detection API
    // https://wicg.github.io/idle-detection/ 
    "idle-detection",

    // KeyboardAPI
    // https://wicg.github.io/keyboard-map/
    "keyboard-map",

    // MIDI
    // https://webaudio.github.io/web-midi-api/
    "midi",

    // Payment
    // https://www.w3.org/TR/payment-request/
    "payment",

    // PictureInPicture
    // https://w3c.github.io/picture-in-picture/
    "picture-in-picture",

    // Digital Credentials
    // https://wicg.github.io/digital-credentials/
    "digital-credentials-get",

    // Federated Credential Management API
    // https://fedidcg.github.io/FedCM/
    "identity-credentials-get",

    // Web Authentication API
    // https://w3c.github.io/webauthn/#
    "publickey-credentials-get",
    "publickey-credentials-create",

    // Wake Lock API
    // https://w3c.github.io/screen-wake-lock/
    "screen-wake-lock",

    // Serial
    // https://wicg.github.io/serial/
    // Should be powerful?
    "serial",
    
    // web-share
    // https://w3c.github.io/web-share/
    "web-share",

    // Window-management
    // https://w3c.github.io/window-management/
    "window-management",

    // Clipboard read
    // https://github.com/w3c/clipboard-apis/issues/163#issuecomment-1878072165
    // https://github.com/w3c/permissions/issues/175
    // https://w3c.github.io/clipboard-apis/#clipboard-permissions
    "clipboard-read",
    "clipboard-write",
    "clipboard",

    // Gamepad
    // https://w3c.github.io/gamepad/
    "gamepad",

    // Browsing topics
    // https://patcg-individual-drafts.github.io/topics/
    "browsing-topics",

    // Local fonts
    // https://wicg.github.io/local-font-access/
    "local-fonts",

    // xr-spatial-tracking
    "xr-spatial-tracking",

    // Attribution
    // https://wicg.github.io/attribution-reporting-api/#network-monkeypatches
    // Includes also headers
    "conversion-measurement",
    "attribution-reporting",

    // https://html.spec.whatwg.org/multipage/infrastructure.html#policy-controlled-features
     "autoplay",

    // https://html.spec.whatwg.org/multipage/infrastructure.html#policy-controlled-features
    "cross-origin-isolated",

    // Client Hints Infraestructure
    "ch-save-data",
    "ch-dpr",
    "ch-width",
    "ch-viewport-width",
    "ch-viewport-height", 
    "ch-device-memory",
    "ch-rtt",
    "ch-downlink",
    "ch-ect",
    "ch-prefers-color-scheme", 
    "ch-prefers-reduced-motion",
    "ch-ua",
    "ch-ua-arch",
    "ch-ua-bitness",
    "ch-ua-form-factors",
    "ch-ua-full-version",
    "ch-ua-full-version-list",
    "ch-ua-mobile",
    "ch-ua-model",
    "ch-ua-platform",
    "ch-ua-platform-version",
    "ch-ua-wow64",

    // Direct Sockets
    // Just Google 'standard'
    // Still unofficial draft
    // https://wicg.github.io/direct-sockets/
    "direct-sockets",

    // Page Lifecycle
    // Not very updated
    // Still draft
    // https://wicg.github.io/page-lifecycle/
    "execution-while-not-rendered",
    "execution-while-out-of-viewport",

    // CSS Spatial Navigation Level 1
    // https://drafts.csswg.org/css-nav-1/
    // Eventually, we expect spatial navigation to be natively supported by browsers. However, this is not yet the case.
    //      - getSpatialNavigationContainer..
    //      - ...
    "navigation-override",

    // Fetch sync-xhr
    // XMLHttpRequest sync-xhr
    // Discussion about deprecation: https://github.com/w3c/webappsec-permissions-policy/issues/410
    "sync-xhr",

    // Shared Autofill
    // Proposed
    // https://github.com/schwering/shared-autofill
    "shared-autofill",

    // Captured Surface Control
    // https://screen-share.github.io/captured-surface-control/
    "captured-surface-control",

    "push",
    "background-fetch",
    "background-sync",
    "persistent-storage",
    "nfc",

    // https://github.com/WICG/aom
    "accessibility-events", 
    "periodic-background-sync",
    // Different to screen-wake-lock
    "system-wake-lock",
    "storage-access",

    // https://privacycg.github.io/requestStorageAccessFor/
    "top-level-storage-access",
    // https://github.com/WICG/keyboard-lock
    "keyboard-lock",
    "pointer-lock",

    "focus-without-user-activation",
    // Turtle Dove
    // https://wicg.github.io/turtledove/#permissions-policy-integration
    "join-ad-interest-group",
    "run-ad-auction",

    // Smart Card
    // https://wicg.github.io/web-smart-card/#permissions-policy
    "smart-card",

    // Sync Script
    // No document?
    // https://github.com/w3c/webappsec-permissions-policy/blob/main/features.md
    "sync-script",
    "trust-token-redemption",

    // https://github.com/fergald/docs/blob/master/explainers/permissions-policy-unload.md
    "unload",

    // https://github.com/w3c/webappsec-permissions-policy/blob/main/policies/vertical_scroll.md
    "vertical-scroll",

    // ================= DEPRECATED
    "document-domain",
    "window-placement",

    // https://github.com/w3c/webappsec-permissions-policy/issues/544
    "deferred-fetch",
    "deferred-fetch-minimal",

    // https://wicg.github.io/web-otp/
    "otp-credentials",

    // https://patcg-individual-drafts.github.io/private-aggregation-api/
    "private-aggregation",

    // https://wicg.github.io/trust-token-api/
    "private-state-token-issuance",

    // https://wicg.github.io/trust-token-api/
    "private-state-token-redemption",

    // https://wicg.github.io/shared-storage/#permission
    "shared-storage",
    "shared-storage-select-url",
    "sub-apps",
    "web-printing",

    // https://screen-share.github.io/capture-all-screens/#feature-policy-integration
    "all-screens-capture",

    // Brave only
    // https://github.com/brave/brave-core/blob/553ed06aae4af211e5607093851724980cbc664b/patches/third_party-blink-renderer-core-permissions_policy-permissions_policy_features.json5.patch
    "solana",
    "ethereum"
]

/* EXPORTS */
exports.PERMISSIONS = PERMISSIONS;

/* GENERAL INFO */
console.log(`\nPermissions: ${PERMISSIONS.length}\n`)
