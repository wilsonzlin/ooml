/////////////////////////////
/// DOM APIs
/////////////////////////////

interface Account {
    displayName: string;
    id: string;
    imageURL?: string;
    name?: string;
    rpDisplayName: string;
}

interface AddEventListenerOptions extends EventListenerOptions {
    once?: boolean;
    passive?: boolean;
}

interface AesCbcParams extends Algorithm {
    iv: BufferSource | null;
}

interface AesCtrParams extends Algorithm {
    counter: BufferSource | null;
    length: number;
}

interface AesDerivedKeyParams extends Algorithm {
    length: number;
}

interface AesGcmParams extends Algorithm {
    additionalData?: BufferSource | null;
    iv: BufferSource | null;
    tagLength?: number;
}

interface AesKeyAlgorithm extends KeyAlgorithm {
    length: number;
}

interface AesKeyGenParams extends Algorithm {
    length: number;
}

interface Algorithm {
    name: string;
}

interface AnalyserOptions extends AudioNodeOptions {
    fftSize?: number;
    maxDecibels?: number;
    minDecibels?: number;
    smoothingTimeConstant?: number;
}

interface AnimationEventInit extends EventInit {
    animationName?: string;
    elapsedTime?: number;
}

interface AssertionOptions {
    allowList?: ScopedCredentialDescriptor[];
    extensions?: WebAuthnExtensions;
    rpId?: string;
    timeoutSeconds?: number;
}

interface AudioBufferOptions {
    length: number;
    numberOfChannels?: number;
    sampleRate: number;
}

interface AudioBufferSourceOptions {
    buffer?: AudioBuffer | null;
    detune?: number;
    loop?: boolean;
    loopEnd?: number;
    loopStart?: number;
    playbackRate?: number;
}

interface AudioContextInfo {
    currentTime?: number;
    sampleRate?: number;
}

interface AudioContextOptions {
    latencyHint?: AudioContextLatencyCategory | number;
    sampleRate?: number;
}

interface AudioNodeOptions {
    channelCount?: number;
    channelCountMode?: ChannelCountMode;
    channelInterpretation?: ChannelInterpretation;
}

interface AudioParamDescriptor {
    defaultValue?: number;
    maxValue?: number;
    minValue?: number;
    name?: string;
}

interface AudioProcessingEventInit extends EventInit {
    inputBuffer: AudioBuffer;
    outputBuffer: AudioBuffer;
    playbackTime: number;
}

interface AudioTimestamp {
    contextTime?: number;
    performanceTime?: number;
}

interface BiquadFilterOptions extends AudioNodeOptions {
    Q?: number;
    detune?: number;
    frequency?: number;
    gain?: number;
    type?: BiquadFilterType;
}

interface ByteLengthChunk {
    byteLength?: number;
}

interface CacheQueryOptions {
    cacheName?: string;
    ignoreMethod?: boolean;
    ignoreSearch?: boolean;
    ignoreVary?: boolean;
}

interface ChannelMergerOptions extends AudioNodeOptions {
    numberOfInputs?: number;
}

interface ChannelSplitterOptions extends AudioNodeOptions {
    numberOfOutputs?: number;
}

interface ClientData {
    challenge: string;
    extensions?: WebAuthnExtensions;
    hashAlg: AlgorithmIdentifier;
    origin: string;
    rpId: string;
    tokenBinding?: string;
}

interface ClientQueryOptions {
    includeReserved?: boolean;
    includeUncontrolled?: boolean;
    type?: ClientTypes;
}

interface CloseEventInit extends EventInit {
    code?: number;
    reason?: string;
    wasClean?: boolean;
}

interface CompositionEventInit extends UIEventInit {
    data?: string;
}

interface ConfirmSiteSpecificExceptionsInformation extends ExceptionInformation {
    arrayOfDomainStrings?: string[];
}

interface ConstantSourceOptions {
    offset?: number;
}

interface ConstrainBooleanParameters {
    exact?: boolean;
    ideal?: boolean;
}

interface ConstrainDOMStringParameters {
    exact?: string | string[];
    ideal?: string | string[];
}

interface ConstrainDoubleRange extends DoubleRange {
    exact?: number;
    ideal?: number;
}

interface ConstrainLongRange extends LongRange {
    exact?: number;
    ideal?: number;
}

interface ConstrainVideoFacingModeParameters {
    exact?: VideoFacingModeEnum | VideoFacingModeEnum[];
    ideal?: VideoFacingModeEnum | VideoFacingModeEnum[];
}

interface ConvolverOptions extends AudioNodeOptions {
    buffer?: AudioBuffer | null;
    disableNormalization?: boolean;
}

interface CustomEventInit<T = any> extends EventInit {
    detail?: T;
}

interface DOMRectInit {
    height?: number;
    width?: number;
    x?: number;
    y?: number;
}

interface DelayOptions extends AudioNodeOptions {
    delayTime?: number;
    maxDelayTime?: number;
}

interface DeviceAccelerationDict {
    x?: number | null;
    y?: number | null;
    z?: number | null;
}

interface DeviceLightEventInit extends EventInit {
    value?: number;
}

interface DeviceMotionEventInit extends EventInit {
    acceleration?: DeviceAccelerationDict | null;
    accelerationIncludingGravity?: DeviceAccelerationDict | null;
    interval?: number | null;
    rotationRate?: DeviceRotationRateDict | null;
}

interface DeviceOrientationEventInit extends EventInit {
    absolute?: boolean;
    alpha?: number | null;
    beta?: number | null;
    gamma?: number | null;
}

interface DeviceRotationRateDict {
    alpha?: number | null;
    beta?: number | null;
    gamma?: number | null;
}

interface DoubleRange {
    max?: number;
    min?: number;
}

interface DynamicsCompressorOptions extends AudioNodeOptions {
    attack?: number;
    knee?: number;
    ratio?: number;
    release?: number;
    threshold?: number;
}

interface EcKeyAlgorithm extends KeyAlgorithm {
    namedCurve: string;
}

interface EcKeyGenParams extends Algorithm {
    namedCurve: string;
}

interface EcKeyImportParams extends Algorithm {
    namedCurve: string;
}

interface EcdhKeyDeriveParams extends Algorithm {
    public: CryptoKey;
}

interface EcdsaParams extends Algorithm {
    hash: AlgorithmIdentifier;
}

interface ErrorEventInit extends EventInit {
    colno?: number;
    error?: any;
    filename?: string;
    lineno?: number;
    message?: string;
}

interface EventInit {
    bubbles?: boolean;
    cancelable?: boolean;
    scoped?: boolean;
}

interface EventListenerOptions {
    capture?: boolean;
}

interface EventModifierInit extends UIEventInit {
    altKey?: boolean;
    ctrlKey?: boolean;
    metaKey?: boolean;
    modifierAltGraph?: boolean;
    modifierCapsLock?: boolean;
    modifierFn?: boolean;
    modifierFnLock?: boolean;
    modifierHyper?: boolean;
    modifierNumLock?: boolean;
    modifierOS?: boolean;
    modifierScrollLock?: boolean;
    modifierSuper?: boolean;
    modifierSymbol?: boolean;
    modifierSymbolLock?: boolean;
    shiftKey?: boolean;
}

interface ExceptionInformation {
    domain?: string | null;
}

interface ExtendableEventInit extends EventInit {
}

interface ExtendableMessageEventInit extends ExtendableEventInit {
    data?: any;
    lastEventId?: string;
    origin?: string;
    ports?: MessagePort[] | null;
    source?: object | ServiceWorker | MessagePort | null;
}

interface FetchEventInit extends ExtendableEventInit {
    clientId?: string;
    request: Request;
    reservedClientId?: string;
    targetClientId?: string;
}

interface FocusEventInit extends UIEventInit {
    relatedTarget?: EventTarget | null;
}

interface FocusNavigationEventInit extends EventInit {
    navigationReason?: string | null;
    originHeight?: number;
    originLeft?: number;
    originTop?: number;
    originWidth?: number;
}

interface FocusNavigationOrigin {
    originHeight?: number;
    originLeft?: number;
    originTop?: number;
    originWidth?: number;
}

interface GainOptions extends AudioNodeOptions {
    gain?: number;
}

interface GamepadEventInit extends EventInit {
    gamepad?: Gamepad;
}

interface GetNotificationOptions {
    tag?: string;
}

interface HashChangeEventInit extends EventInit {
    newURL?: string;
    oldURL?: string;
}

interface HkdfParams extends Algorithm {
    hash: AlgorithmIdentifier;
    info: BufferSource | null;
    salt: BufferSource | null;
}

interface HmacImportParams extends Algorithm {
    hash: AlgorithmIdentifier;
    length?: number;
}

interface HmacKeyAlgorithm extends KeyAlgorithm {
    hash: KeyAlgorithm;
    length: number;
}

interface HmacKeyGenParams extends Algorithm {
    hash: AlgorithmIdentifier;
    length?: number;
}

interface IDBIndexParameters {
    multiEntry?: boolean;
    unique?: boolean;
}

interface IDBObjectStoreParameters {
    autoIncrement?: boolean;
    keyPath?: string | string[];
}

interface IIRFilterOptions extends AudioNodeOptions {
    feedback: number[];
    feedforward: number[];
}

interface IntersectionObserverEntryInit {
    boundingClientRect: DOMRectInit;
    intersectionRect: DOMRectInit;
    isIntersecting: boolean;
    rootBounds: DOMRectInit;
    target: Element;
    time: number;
}

interface IntersectionObserverInit {
    root?: Element | null;
    rootMargin?: string;
    threshold?: number | number[];
}

interface JsonWebKey {
    alg?: string;
    crv?: string;
    d?: string;
    dp?: string;
    dq?: string;
    e?: string;
    ext?: boolean;
    k?: string;
    key_ops?: string[];
    kty?: string;
    n?: string;
    oth?: RsaOtherPrimesInfo[];
    p?: string;
    q?: string;
    qi?: string;
    use?: string;
    x?: string;
    y?: string;
}

interface KeyAlgorithm {
    name: string;
}

interface KeyboardEventInit extends EventModifierInit {
    code?: string;
    key?: string;
    location?: number;
    repeat?: boolean;
}

interface LongRange {
    max?: number;
    min?: number;
}

interface MSAccountInfo {
    accountImageUri?: string;
    accountName?: string;
    rpDisplayName: string;
    userDisplayName: string;
    userId?: string;
}

interface MSAudioLocalClientEvent extends MSLocalClientEventBase {
    cpuInsufficientEventRatio?: number;
    deviceCaptureNotFunctioningEventRatio?: number;
    deviceClippingEventRatio?: number;
    deviceEchoEventRatio?: number;
    deviceGlitchesEventRatio?: number;
    deviceHalfDuplexAECEventRatio?: number;
    deviceHowlingEventCount?: number;
    deviceLowSNREventRatio?: number;
    deviceLowSpeechLevelEventRatio?: number;
    deviceMultipleEndpointsEventCount?: number;
    deviceNearEndToEchoRatioEventRatio?: number;
    deviceRenderMuteEventRatio?: number;
    deviceRenderNotFunctioningEventRatio?: number;
    deviceRenderZeroVolumeEventRatio?: number;
    networkDelayEventRatio?: number;
    networkSendQualityEventRatio?: number;
}

interface MSAudioRecvPayload extends MSPayloadBase {
    burstLossLength1?: number;
    burstLossLength2?: number;
    burstLossLength3?: number;
    burstLossLength4?: number;
    burstLossLength5?: number;
    burstLossLength6?: number;
    burstLossLength7?: number;
    burstLossLength8OrHigher?: number;
    fecRecvDistance1?: number;
    fecRecvDistance2?: number;
    fecRecvDistance3?: number;
    packetReorderDepthAvg?: number;
    packetReorderDepthMax?: number;
    packetReorderRatio?: number;
    ratioCompressedSamplesAvg?: number;
    ratioConcealedSamplesAvg?: number;
    ratioStretchedSamplesAvg?: number;
    samplingRate?: number;
    signal?: MSAudioRecvSignal;
}

interface MSAudioRecvSignal {
    initialSignalLevelRMS?: number;
    recvNoiseLevelCh1?: number;
    recvSignalLevelCh1?: number;
    renderLoopbackSignalLevel?: number;
    renderNoiseLevel?: number;
    renderSignalLevel?: number;
}

interface MSAudioSendPayload extends MSPayloadBase {
    audioFECUsed?: boolean;
    samplingRate?: number;
    sendMutePercent?: number;
    signal?: MSAudioSendSignal;
}

interface MSAudioSendSignal {
    noiseLevel?: number;
    sendNoiseLevelCh1?: number;
    sendSignalLevelCh1?: number;
}

interface MSConnectivity {
    iceType?: MSIceType;
    iceWarningFlags?: MSIceWarningFlags;
    relayAddress?: MSRelayAddress;
}

interface MSCredentialFilter {
    accept?: MSCredentialSpec[];
}

interface MSCredentialParameters {
    type?: MSCredentialType;
}

interface MSCredentialSpec {
    id?: string;
    type: MSCredentialType;
}

interface MSDCCEventInit extends EventInit {
    maxFr?: number;
    maxFs?: number;
}

interface MSDSHEventInit extends EventInit {
    sources?: number[];
    timestamp?: number;
}

interface MSDelay {
    roundTrip?: number;
    roundTripMax?: number;
}

interface MSDescription extends RTCStats {
    connectivity?: MSConnectivity;
    deviceDevName?: string;
    localAddr?: MSIPAddressInfo;
    networkconnectivity?: MSNetworkConnectivityInfo;
    reflexiveLocalIPAddr?: MSIPAddressInfo;
    remoteAddr?: MSIPAddressInfo;
    transport?: RTCIceProtocol;
}

interface MSFIDOCredentialParameters extends MSCredentialParameters {
    algorithm?: AlgorithmIdentifier;
    authenticators?: string[];
}

interface MSIPAddressInfo {
    ipAddr?: string;
    manufacturerMacAddrMask?: string;
    port?: number;
}

interface MSIceWarningFlags {
    allocationMessageIntegrityFailed?: boolean;
    alternateServerReceived?: boolean;
    connCheckMessageIntegrityFailed?: boolean;
    connCheckOtherError?: boolean;
    fipsAllocationFailure?: boolean;
    multipleRelayServersAttempted?: boolean;
    noRelayServersConfigured?: boolean;
    portRangeExhausted?: boolean;
    pseudoTLSFailure?: boolean;
    tcpNatConnectivityFailed?: boolean;
    tcpRelayConnectivityFailed?: boolean;
    turnAuthUnknownUsernameError?: boolean;
    turnTcpAllocateFailed?: boolean;
    turnTcpSendFailed?: boolean;
    turnTcpTimedOut?: boolean;
    turnTurnTcpConnectivityFailed?: boolean;
    turnUdpAllocateFailed?: boolean;
    turnUdpSendFailed?: boolean;
    udpLocalConnectivityFailed?: boolean;
    udpNatConnectivityFailed?: boolean;
    udpRelayConnectivityFailed?: boolean;
    useCandidateChecksFailed?: boolean;
}

interface MSJitter {
    interArrival?: number;
    interArrivalMax?: number;
    interArrivalSD?: number;
}

interface MSLocalClientEventBase extends RTCStats {
    networkBandwidthLowEventRatio?: number;
    networkReceiveQualityEventRatio?: number;
}

interface MSNetwork extends RTCStats {
    delay?: MSDelay;
    jitter?: MSJitter;
    packetLoss?: MSPacketLoss;
    utilization?: MSUtilization;
}

interface MSNetworkConnectivityInfo {
    linkspeed?: number;
    networkConnectionDetails?: string;
    vpn?: boolean;
}

interface MSNetworkInterfaceType {
    interfaceTypeEthernet?: boolean;
    interfaceTypePPP?: boolean;
    interfaceTypeTunnel?: boolean;
    interfaceTypeWWAN?: boolean;
    interfaceTypeWireless?: boolean;
}

interface MSOutboundNetwork extends MSNetwork {
    appliedBandwidthLimit?: number;
}

interface MSPacketLoss {
    lossRate?: number;
    lossRateMax?: number;
}

interface MSPayloadBase extends RTCStats {
    payloadDescription?: string;
}

interface MSPortRange {
    max?: number;
    min?: number;
}

interface MSRelayAddress {
    port?: number;
    relayAddress?: string;
}

interface MSSignatureParameters {
    userPrompt?: string;
}

interface MSTransportDiagnosticsStats extends RTCStats {
    allocationTimeInMs?: number;
    baseAddress?: string;
    baseInterface?: MSNetworkInterfaceType;
    iceRole?: RTCIceRole;
    iceWarningFlags?: MSIceWarningFlags;
    interfaces?: MSNetworkInterfaceType;
    localAddrType?: MSIceAddrType;
    localAddress?: string;
    localInterface?: MSNetworkInterfaceType;
    localMR?: string;
    localMRTCPPort?: number;
    localSite?: string;
    msRtcEngineVersion?: string;
    networkName?: string;
    numConsentReqReceived?: number;
    numConsentReqSent?: number;
    numConsentRespReceived?: number;
    numConsentRespSent?: number;
    portRangeMax?: number;
    portRangeMin?: number;
    protocol?: RTCIceProtocol;
    remoteAddrType?: MSIceAddrType;
    remoteAddress?: string;
    remoteMR?: string;
    remoteMRTCPPort?: number;
    remoteSite?: string;
    rtpRtcpMux?: boolean;
    stunVer?: number;
}

interface MSUtilization {
    bandwidthEstimation?: number;
    bandwidthEstimationAvg?: number;
    bandwidthEstimationMax?: number;
    bandwidthEstimationMin?: number;
    bandwidthEstimationStdDev?: number;
    packets?: number;
}

interface MSVideoPayload extends MSPayloadBase {
    durationSeconds?: number;
    resolution?: string;
    videoBitRateAvg?: number;
    videoBitRateMax?: number;
    videoFrameRateAvg?: number;
    videoPacketLossRate?: number;
}

interface MSVideoRecvPayload extends MSVideoPayload {
    lowBitRateCallPercent?: number;
    lowFrameRateCallPercent?: number;
    recvBitRateAverage?: number;
    recvBitRateMaximum?: number;
    recvCodecType?: string;
    recvFpsHarmonicAverage?: number;
    recvFrameRateAverage?: number;
    recvNumResSwitches?: number;
    recvReorderBufferMaxSuccessfullyOrderedExtent?: number;
    recvReorderBufferMaxSuccessfullyOrderedLateTime?: number;
    recvReorderBufferPacketsDroppedDueToBufferExhaustion?: number;
    recvReorderBufferPacketsDroppedDueToTimeout?: number;
    recvReorderBufferReorderedPackets?: number;
    recvResolutionHeight?: number;
    recvResolutionWidth?: number;
    recvVideoStreamsMax?: number;
    recvVideoStreamsMin?: number;
    recvVideoStreamsMode?: number;
    reorderBufferTotalPackets?: number;
    videoFrameLossRate?: number;
    videoPostFECPLR?: number;
    videoResolutions?: MSVideoResolutionDistribution;
}

interface MSVideoResolutionDistribution {
    cifQuality?: number;
    h1080Quality?: number;
    h1440Quality?: number;
    h2160Quality?: number;
    h720Quality?: number;
    vgaQuality?: number;
}

interface MSVideoSendPayload extends MSVideoPayload {
    sendBitRateAverage?: number;
    sendBitRateMaximum?: number;
    sendFrameRateAverage?: number;
    sendResolutionHeight?: number;
    sendResolutionWidth?: number;
    sendVideoStreamsMax?: number;
}

interface MediaElementAudioSourceOptions {
    mediaElement: HTMLMediaElement;
}

interface MediaEncryptedEventInit extends EventInit {
    initData?: ArrayBuffer | null;
    initDataType?: string;
}

interface MediaKeyMessageEventInit extends EventInit {
    message?: ArrayBuffer | null;
    messageType?: MediaKeyMessageType;
}

interface MediaKeySystemConfiguration {
    audioCapabilities?: MediaKeySystemMediaCapability[];
    distinctiveIdentifier?: MediaKeysRequirement;
    initDataTypes?: string[];
    persistentState?: MediaKeysRequirement;
    videoCapabilities?: MediaKeySystemMediaCapability[];
}

interface MediaKeySystemMediaCapability {
    contentType?: string;
    robustness?: string;
}

interface MediaStreamConstraints {
    audio?: boolean | MediaTrackConstraints;
    video?: boolean | MediaTrackConstraints;
}

interface MediaStreamErrorEventInit extends EventInit {
    error?: MediaStreamError | null;
}

interface MediaStreamEventInit extends EventInit {
    stream?: MediaStream;
}

interface MediaStreamTrackEventInit extends EventInit {
    track?: MediaStreamTrack | null;
}

interface MediaTrackCapabilities {
    aspectRatio?: number | DoubleRange;
    deviceId?: string;
    echoCancellation?: boolean[];
    facingMode?: string;
    frameRate?: number | DoubleRange;
    groupId?: string;
    height?: number | LongRange;
    sampleRate?: number | LongRange;
    sampleSize?: number | LongRange;
    volume?: number | DoubleRange;
    width?: number | LongRange;
}

interface MediaTrackConstraintSet {
    aspectRatio?: ConstrainDouble;
    channelCount?: ConstrainLong;
    deviceId?: ConstrainDOMString;
    displaySurface?: ConstrainDOMString;
    echoCancellation?: ConstrainBoolean;
    facingMode?: ConstrainDOMString;
    frameRate?: ConstrainDouble;
    groupId?: ConstrainDOMString;
    height?: ConstrainLong;
    latency?: ConstrainDouble;
    logicalSurface?: ConstrainBoolean;
    sampleRate?: ConstrainLong;
    sampleSize?: ConstrainLong;
    volume?: ConstrainDouble;
    width?: ConstrainLong;
}

interface MediaTrackConstraints extends MediaTrackConstraintSet {
    advanced?: MediaTrackConstraintSet[];
}

interface MediaTrackSettings {
    aspectRatio?: number;
    deviceId?: string;
    echoCancellation?: boolean;
    facingMode?: string;
    frameRate?: number;
    groupId?: string;
    height?: number;
    sampleRate?: number;
    sampleSize?: number;
    volume?: number;
    width?: number;
}

interface MediaTrackSupportedConstraints {
    aspectRatio?: boolean;
    deviceId?: boolean;
    echoCancellation?: boolean;
    facingMode?: boolean;
    frameRate?: boolean;
    groupId?: boolean;
    height?: boolean;
    sampleRate?: boolean;
    sampleSize?: boolean;
    volume?: boolean;
    width?: boolean;
}

interface MessageEventInit extends EventInit {
    channel?: string;
    data?: any;
    lastEventId?: string;
    origin?: string;
    ports?: MessagePort[];
    source?: Window | null;
}

interface MouseEventInit extends EventModifierInit {
    button?: number;
    buttons?: number;
    clientX?: number;
    clientY?: number;
    relatedTarget?: EventTarget | null;
    screenX?: number;
    screenY?: number;
}

interface MsZoomToOptions {
    animate?: string;
    contentX?: number;
    contentY?: number;
    scaleFactor?: number;
    viewportX?: string | null;
    viewportY?: string | null;
}

interface MutationObserverInit {
    attributeFilter?: string[];
    attributeOldValue?: boolean;
    attributes?: boolean;
    characterData?: boolean;
    characterDataOldValue?: boolean;
    childList?: boolean;
    subtree?: boolean;
}

interface NotificationEventInit extends ExtendableEventInit {
    action?: string;
    notification: Notification;
}

interface NotificationOptions {
    body?: string;
    data?: any;
    dir?: NotificationDirection;
    icon?: string;
    lang?: string;
    tag?: string;
}

interface ObjectURLOptions {
    oneTimeOnly?: boolean;
}

interface OfflineAudioCompletionEventInit extends EventInit {
    renderedBuffer: AudioBuffer;
}

interface OscillatorOptions extends AudioNodeOptions {
    detune?: number;
    frequency?: number;
    periodicWave?: PeriodicWave;
    type?: OscillatorType;
}

interface PannerOptions extends AudioNodeOptions {
    coneInnerAngle?: number;
    coneOuterAngle?: number;
    coneOuterGain?: number;
    distanceModel?: DistanceModelType;
    maxDistance?: number;
    orientationX?: number;
    orientationY?: number;
    orientationZ?: number;
    panningModel?: PanningModelType;
    positionX?: number;
    positionY?: number;
    positionZ?: number;
    refDistance?: number;
    rolloffFactor?: number;
}

interface PaymentCurrencyAmount {
    currency: string;
    currencySystem?: string;
    value: string;
}

interface PaymentDetailsBase {
    displayItems?: PaymentItem[];
    modifiers?: PaymentDetailsModifier[];
    shippingOptions?: PaymentShippingOption[];
}

interface PaymentDetailsInit extends PaymentDetailsBase {
    id?: string;
    total: PaymentItem;
}

interface PaymentDetailsModifier {
    additionalDisplayItems?: PaymentItem[];
    data?: any;
    supportedMethods: string | string[];
    total?: PaymentItem;
}

interface PaymentDetailsUpdate extends PaymentDetailsBase {
    error?: string;
    total?: PaymentItem;
}

interface PaymentItem {
    amount: PaymentCurrencyAmount;
    label: string;
    pending?: boolean;
}

interface PaymentMethodData {
    data?: any;
    supportedMethods: string | string[];
}

interface PaymentOptions {
    requestPayerEmail?: boolean;
    requestPayerName?: boolean;
    requestPayerPhone?: boolean;
    requestShipping?: boolean;
    shippingType?: string;
}

interface PaymentRequestUpdateEventInit extends EventInit {
}

interface PaymentShippingOption {
    amount: PaymentCurrencyAmount;
    id: string;
    label: string;
    selected?: boolean;
}

interface Pbkdf2Params extends Algorithm {
    hash: AlgorithmIdentifier;
    iterations: number;
    salt: BufferSource | null;
}

interface PeriodicWaveConstraints {
    disableNormalization?: boolean;
}

interface PeriodicWaveOptions extends PeriodicWaveConstraints {
    imag?: number[];
    real?: number[];
}

interface PointerEventInit extends MouseEventInit {
    height?: number;
    isPrimary?: boolean;
    pointerId?: number;
    pointerType?: string;
    pressure?: number;
    tiltX?: number;
    tiltY?: number;
    width?: number;
}

interface PopStateEventInit extends EventInit {
    state?: any;
}

interface PositionOptions {
    enableHighAccuracy?: boolean;
    maximumAge?: number;
    timeout?: number;
}

interface ProgressEventInit extends EventInit {
    lengthComputable?: boolean;
    loaded?: number;
    total?: number;
}

interface PushEventInit extends ExtendableEventInit {
    data?: BufferSource | string | null;
}

interface PushSubscriptionChangeInit extends ExtendableEventInit {
    newSubscription?: PushSubscription;
    oldSubscription?: PushSubscription;
}

interface PushSubscriptionOptionsInit {
    applicationServerKey?: BufferSource | string | null;
    userVisibleOnly?: boolean;
}

interface QueuingStrategy {
    highWaterMark?: number;
    size?: WritableStreamChunkCallback;
}

interface RTCConfiguration {
    bundlePolicy?: RTCBundlePolicy;
    iceServers?: RTCIceServer[];
    iceTransportPolicy?: RTCIceTransportPolicy;
    peerIdentity?: string;
}

interface RTCDTMFToneChangeEventInit extends EventInit {
    tone?: string;
}

interface RTCDtlsFingerprint {
    algorithm?: string;
    value?: string;
}

interface RTCDtlsParameters {
    fingerprints?: RTCDtlsFingerprint[];
    role?: RTCDtlsRole;
}

interface RTCIceCandidateAttributes extends RTCStats {
    addressSourceUrl?: string;
    candidateType?: RTCStatsIceCandidateType;
    ipAddress?: string;
    portNumber?: number;
    priority?: number;
    transport?: string;
}

interface RTCIceCandidateComplete {
}

interface RTCIceCandidateDictionary {
    foundation?: string;
    ip?: string;
    msMTurnSessionId?: string;
    port?: number;
    priority?: number;
    protocol?: RTCIceProtocol;
    relatedAddress?: string;
    relatedPort?: number;
    tcpType?: RTCIceTcpCandidateType;
    type?: RTCIceCandidateType;
}

interface RTCIceCandidateInit {
    candidate?: string;
    sdpMLineIndex?: number;
    sdpMid?: string;
}

interface RTCIceCandidatePair {
    local?: RTCIceCandidateDictionary;
    remote?: RTCIceCandidateDictionary;
}

interface RTCIceCandidatePairStats extends RTCStats {
    availableIncomingBitrate?: number;
    availableOutgoingBitrate?: number;
    bytesReceived?: number;
    bytesSent?: number;
    localCandidateId?: string;
    nominated?: boolean;
    priority?: number;
    readable?: boolean;
    remoteCandidateId?: string;
    roundTripTime?: number;
    state?: RTCStatsIceCandidatePairState;
    transportId?: string;
    writable?: boolean;
}

interface RTCIceGatherOptions {
    gatherPolicy?: RTCIceGatherPolicy;
    iceservers?: RTCIceServer[];
    portRange?: MSPortRange;
}

interface RTCIceParameters {
    iceLite?: boolean | null;
    password?: string;
    usernameFragment?: string;
}

interface RTCIceServer {
    credential?: string | null;
    urls?: any;
    username?: string | null;
}

interface RTCInboundRTPStreamStats extends RTCRTPStreamStats {
    bytesReceived?: number;
    fractionLost?: number;
    jitter?: number;
    packetsLost?: number;
    packetsReceived?: number;
}

interface RTCMediaStreamTrackStats extends RTCStats {
    audioLevel?: number;
    echoReturnLoss?: number;
    echoReturnLossEnhancement?: number;
    frameHeight?: number;
    frameWidth?: number;
    framesCorrupted?: number;
    framesDecoded?: number;
    framesDropped?: number;
    framesPerSecond?: number;
    framesReceived?: number;
    framesSent?: number;
    remoteSource?: boolean;
    ssrcIds?: string[];
    trackIdentifier?: string;
}

interface RTCOfferOptions {
    iceRestart?: boolean;
    offerToReceiveAudio?: number;
    offerToReceiveVideo?: number;
    voiceActivityDetection?: boolean;
}

interface RTCOutboundRTPStreamStats extends RTCRTPStreamStats {
    bytesSent?: number;
    packetsSent?: number;
    roundTripTime?: number;
    targetBitrate?: number;
}

interface RTCPeerConnectionIceEventInit extends EventInit {
    candidate?: RTCIceCandidate;
}

interface RTCRTPStreamStats extends RTCStats {
    associateStatsId?: string;
    codecId?: string;
    firCount?: number;
    isRemote?: boolean;
    mediaTrackId?: string;
    mediaType?: string;
    nackCount?: number;
    pliCount?: number;
    sliCount?: number;
    ssrc?: string;
    transportId?: string;
}

interface RTCRtcpFeedback {
    parameter?: string;
    type?: string;
}

interface RTCRtcpParameters {
    cname?: string;
    mux?: boolean;
    reducedSize?: boolean;
    ssrc?: number;
}

interface RTCRtpCapabilities {
    codecs?: RTCRtpCodecCapability[];
    fecMechanisms?: string[];
    headerExtensions?: RTCRtpHeaderExtension[];
}

interface RTCRtpCodecCapability {
    clockRate?: number;
    kind?: string;
    maxSpatialLayers?: number;
    maxTemporalLayers?: number;
    maxptime?: number;
    name?: string;
    numChannels?: number;
    options?: any;
    parameters?: any;
    preferredPayloadType?: number;
    ptime?: number;
    rtcpFeedback?: RTCRtcpFeedback[];
    svcMultiStreamSupport?: boolean;
}

interface RTCRtpCodecParameters {
    clockRate?: number;
    maxptime?: number;
    name?: string;
    numChannels?: number;
    parameters?: any;
    payloadType?: number;
    ptime?: number;
    rtcpFeedback?: RTCRtcpFeedback[];
}

interface RTCRtpContributingSource {
    audioLevel?: number;
    csrc?: number;
    timestamp?: number;
}

interface RTCRtpEncodingParameters {
    active?: boolean;
    codecPayloadType?: number;
    dependencyEncodingIds?: string[];
    encodingId?: string;
    fec?: RTCRtpFecParameters;
    framerateScale?: number;
    maxBitrate?: number;
    maxFramerate?: number;
    minQuality?: number;
    priority?: number;
    resolutionScale?: number;
    rtx?: RTCRtpRtxParameters;
    ssrc?: number;
    ssrcRange?: RTCSsrcRange;
}

interface RTCRtpFecParameters {
    mechanism?: string;
    ssrc?: number;
}

interface RTCRtpHeaderExtension {
    kind?: string;
    preferredEncrypt?: boolean;
    preferredId?: number;
    uri?: string;
}

interface RTCRtpHeaderExtensionParameters {
    encrypt?: boolean;
    id?: number;
    uri?: string;
}

interface RTCRtpParameters {
    codecs?: RTCRtpCodecParameters[];
    degradationPreference?: RTCDegradationPreference;
    encodings?: RTCRtpEncodingParameters[];
    headerExtensions?: RTCRtpHeaderExtensionParameters[];
    muxId?: string;
    rtcp?: RTCRtcpParameters;
}

interface RTCRtpRtxParameters {
    ssrc?: number;
}

interface RTCRtpUnhandled {
    muxId?: string;
    payloadType?: number;
    ssrc?: number;
}

interface RTCSessionDescriptionInit {
    sdp?: string;
    type?: RTCSdpType;
}

interface RTCSrtpKeyParam {
    keyMethod?: string;
    keySalt?: string;
    lifetime?: string;
    mkiLength?: number;
    mkiValue?: number;
}

interface RTCSrtpSdesParameters {
    cryptoSuite?: string;
    keyParams?: RTCSrtpKeyParam[];
    sessionParams?: string[];
    tag?: number;
}

interface RTCSsrcRange {
    max?: number;
    min?: number;
}

interface RTCStats {
    id?: string;
    msType?: MSStatsType;
    timestamp?: number;
    type?: RTCStatsType;
}

interface RTCStatsReport {
}

interface RTCTransportStats extends RTCStats {
    activeConnection?: boolean;
    bytesReceived?: number;
    bytesSent?: number;
    localCertificateId?: string;
    remoteCertificateId?: string;
    rtcpTransportStatsId?: string;
    selectedCandidatePairId?: string;
}

interface RegistrationOptions {
    scope?: string;
}

interface RequestInit {
    body?: Blob | BufferSource | FormData | string | null;
    cache?: RequestCache;
    credentials?: RequestCredentials;
    headers?: HeadersInit;
    integrity?: string;
    keepalive?: boolean;
    method?: string;
    mode?: RequestMode;
    redirect?: RequestRedirect;
    referrer?: string;
    referrerPolicy?: ReferrerPolicy;
    signal?: AbortSignal;
    window?: any;
}

interface ResponseInit {
    headers?: HeadersInit;
    status?: number;
    statusText?: string;
}

interface RsaHashedImportParams extends Algorithm {
    hash: AlgorithmIdentifier;
}

interface RsaHashedKeyAlgorithm extends RsaKeyAlgorithm {
    hash: KeyAlgorithm;
}

interface RsaHashedKeyGenParams extends RsaKeyGenParams {
    hash: AlgorithmIdentifier;
}

interface RsaKeyAlgorithm extends KeyAlgorithm {
    modulusLength: number;
    publicExponent: Uint8Array;
}

interface RsaKeyGenParams extends Algorithm {
    modulusLength: number;
    publicExponent: Uint8Array;
}

interface RsaOaepParams extends Algorithm {
    label?: BufferSource | null;
}

interface RsaOtherPrimesInfo {
    d?: string;
    r?: string;
    t?: string;
}

interface RsaPssParams extends Algorithm {
    saltLength: number;
}

interface ScopedCredentialDescriptor {
    id: BufferSource | null;
    transports?: Transport[];
    type: ScopedCredentialType;
}

interface ScopedCredentialOptions {
    excludeList?: ScopedCredentialDescriptor[];
    extensions?: WebAuthnExtensions;
    rpId?: string;
    timeoutSeconds?: number;
}

interface ScopedCredentialParameters {
    algorithm: AlgorithmIdentifier;
    type: ScopedCredentialType;
}

interface SecurityPolicyViolationEventInit extends EventInit {
    blockedURI?: string;
    columnNumber?: number;
    documentURI?: string;
    effectiveDirective?: string;
    lineNumber?: number;
    originalPolicy?: string;
    referrer?: string;
    sourceFile?: string;
    statusCode?: number;
    violatedDirective?: string;
}

interface ServiceWorkerMessageEventInit extends EventInit {
    data?: any;
    lastEventId?: string;
    origin?: string;
    ports?: MessagePort[] | null;
    source?: ServiceWorker | MessagePort | null;
}

interface SpeechSynthesisEventInit extends EventInit {
    charIndex?: number;
    charLength?: number;
    elapsedTime?: number;
    name?: string;
    utterance?: SpeechSynthesisUtterance | null;
}

interface StereoPannerOptions extends AudioNodeOptions {
    pan?: number;
}

interface StoreExceptionsInformation extends ExceptionInformation {
    detailURI?: string | null;
    explanationString?: string | null;
    siteName?: string | null;
}

interface StoreSiteSpecificExceptionsInformation extends StoreExceptionsInformation {
    arrayOfDomainStrings?: string[];
}

interface SyncEventInit extends ExtendableEventInit {
    lastChance?: boolean;
    tag: string;
}

interface TextDecodeOptions {
    stream?: boolean;
}

interface TextDecoderOptions {
    fatal?: boolean;
    ignoreBOM?: boolean;
}

interface TrackEventInit extends EventInit {
    track?: VideoTrack | AudioTrack | TextTrack | null;
}

interface TransitionEventInit extends EventInit {
    elapsedTime?: number;
    propertyName?: string;
}

interface UIEventInit extends EventInit {
    detail?: number;
    view?: Window | null;
}

interface UnderlyingSink {
    abort?: WritableStreamErrorCallback;
    close?: WritableStreamDefaultControllerCallback;
    start: WritableStreamDefaultControllerCallback;
    write?: WritableStreamChunkCallback;
}

interface VRDisplayEventInit extends EventInit {
    display: VRDisplay;
    reason?: VRDisplayEventReason;
}

interface VRLayer {
    leftBounds?: number[] | null;
    rightBounds?: number[] | null;
    source?: HTMLCanvasElement | null;
}

interface VRStageParameters {
    sittingToStandingTransform?: Float32Array;
    sizeX?: number;
    sizeY?: number;
}

interface WaveShaperOptions extends AudioNodeOptions {
    curve?: number[];
    oversample?: OverSampleType;
}

interface WebAuthnExtensions {
}

interface WebGLContextAttributes {
    alpha?: boolean;
    antialias?: boolean;
    depth?: boolean;
    failIfMajorPerformanceCaveat?: boolean;
    premultipliedAlpha?: boolean;
    preserveDrawingBuffer?: boolean;
    stencil?: boolean;
}

interface WebGLContextEventInit extends EventInit {
    statusMessage?: string;
}

interface WheelEventInit extends MouseEventInit {
    deltaMode?: number;
    deltaX?: number;
    deltaY?: number;
    deltaZ?: number;
}

type WebKitEntriesCallback = (entries: WebKitEntry[]) => void;

type WebKitErrorCallback = (err: DOMError) => void;

type WebKitFileCallback = (file: File) => void;

interface ANGLE_instanced_arrays {
    drawArraysInstancedANGLE(mode: number, first: number, count: number, primcount: number): void;
    drawElementsInstancedANGLE(mode: number, count: number, type: number, offset: number, primcount: number): void;
    vertexAttribDivisorANGLE(index: number, divisor: number): void;
}

declare var ANGLE_instanced_arrays: {
    prototype: ANGLE_instanced_arrays;
    new(): ANGLE_instanced_arrays;
    readonly VERTEX_ATTRIB_ARRAY_DIVISOR_ANGLE: number;
};

interface AbortController {
    readonly signal: AbortSignal;
    abort(): void;
}

declare var AbortController: {
    prototype: AbortController;
    new(): AbortController;
};

interface AbortSignalEventType {
    "abort": ProgressEvent;
}

interface AbortSignal extends EventTarget {
    /*! @ooml-mapto(addEventListener) */ addAbortSignalEventListener<T extends AbortSignalEventType>(type: __Class<T>, listener: EventListener<AbortSignal, T>, options?: boolean | AddEventListenerOptions): void;
    /*! @ooml-mapto(removeEventListener) */ removeAbortSignalEventListener<T extends AbortSignalEventType>(type: __Class<T>, listener: EventListener<AbortSignal, T>, options?: boolean | EventListenerOptions): void;
    readonly aborted: boolean;
}

declare var AbortSignal: {
    prototype: AbortSignal;
    new(): AbortSignal;
};

interface AbstractWorkerEventType {
    "error": ErrorEvent;
}

interface AbstractWorker extends EventTarget {
    /*! @ooml-mapto(addEventListener) */ addAbstractWorkerEventListener<T extends AbstractWorkerEventType>(type: __Class<T>, listener: EventListener<AbstractWorker, T>, options?: boolean | AddEventListenerOptions): void;
    /*! @ooml-mapto(removeEventListener) */ removeAbstractWorkerEventListener<T extends AbstractWorkerEventType>(type: __Class<T>, listener: EventListener<AbstractWorker, T>, options?: boolean | EventListenerOptions): void;
}

interface AesCfbParams extends Algorithm {
    iv: BufferSource;
}

interface AesCmacParams extends Algorithm {
    length: number;
}

interface AnalyserNode extends AudioNode {
    fftSize: number;
    readonly frequencyBinCount: number;
    maxDecibels: number;
    minDecibels: number;
    smoothingTimeConstant: number;
    getByteFrequencyData(array: Uint8Array): void;
    getByteTimeDomainData(array: Uint8Array): void;
    getFloatFrequencyData(array: Float32Array): void;
    getFloatTimeDomainData(array: Float32Array): void;
}

declare var AnalyserNode: {
    prototype: AnalyserNode;
    new(): AnalyserNode;
};

interface Animation {
    currentTime: number | null;
    effect: AnimationEffectReadOnly;
    readonly finished: Promise<Animation>;
    id: string;
    readonly pending: boolean;
    readonly playState: "idle" | "running" | "paused" | "finished";
    playbackRate: number;
    readonly ready: Promise<Animation>;
    startTime: number;
    timeline: AnimationTimeline;
    cancel(): void;
    finish(): void;
    oncancel: (this: Animation, ev: AnimationPlaybackEvent) => any;
    onfinish: (this: Animation, ev: AnimationPlaybackEvent) => any;
    pause(): void;
    play(): void;
    reverse(): void;
}

declare var Animation: {
    prototype: Animation;
    new(effect?: AnimationEffectReadOnly, timeline?: AnimationTimeline): Animation;
};

interface AnimationEffectReadOnly {
    readonly timing: number;
    getComputedTiming(): ComputedTimingProperties;
}

interface AnimationEvent extends Event {
    readonly animationName: string;
    readonly elapsedTime: number;
}

declare var AnimationEvent: {
    prototype: AnimationEvent;
    new(typeArg: string, eventInitDict?: AnimationEventInit): AnimationEvent;
};

interface AnimationKeyFrame {
    easing?: string;
    offset?: number;
    [index: string]: string | number | null;
}

interface AnimationOptions {
    delay?: number;
    direction?: "normal" | "reverse" | "alternate" | "alternate-reverse";
    duration?: number;
    easing?: string;
    endDelay?: number;
    fill?: "none" | "forwards" | "backwards" | "both"| "auto";
    id?: string;
    iterationStart?: number;
    iterations?: number;
}

interface AnimationPlaybackEvent extends Event {
    readonly currentTime: number | null;
    readonly timelineTime: number | null;
}

declare var AnimationPlaybackEvent: {
    prototype: AnimationPlaybackEvent;
    new(type: string, eventInitDict?: AnimationPlaybackEventInit): AnimationPlaybackEvent;
};

interface AnimationPlaybackEventInit extends EventInit {
    currentTime?: number | null;
    timelineTime?: number | null;
}

interface AnimationTimeline {
    readonly currentTime: number | null;
}

interface ApplicationCacheEventType {
    "cached": Event;
    "checking": Event;
    "downloading": Event;
    "error": Event;
    "noupdate": Event;
    "obsolete": Event;
    "progress": ProgressEvent;
    "updateready": Event;
}

interface ApplicationCache extends EventTarget {
    /*! @ooml-mapto(addEventListener) */ addApplicationCacheEventListener<T extends ApplicationCacheEventType>(type: __Class<T>, listener: EventListener<ApplicationCache, T>, options?: boolean | AddEventListenerOptions): void;
    /*! @ooml-mapto(removeEventListener) */ removeApplicationCacheEventListener<T extends ApplicationCacheEventType>(type: __Class<T>, listener: EventListener<ApplicationCache, T>, options?: boolean | EventListenerOptions): void;
    readonly status: number;
    abort(): void;
    swapCache(): void;
    update(): void;
}

declare var ApplicationCache: {
    prototype: ApplicationCache;
    new(): ApplicationCache;
    readonly CHECKING: number;
    readonly DOWNLOADING: number;
    readonly IDLE: number;
    readonly OBSOLETE: number;
    readonly UNCACHED: number;
    readonly UPDATEREADY: number;
};

interface AssignedNodesOptions {
    flatten?: boolean;
}

interface Attr extends Node {
    readonly name: string;
    readonly ownerElement: Element | null;
    readonly prefix: string | null;
    readonly specified: boolean;
    value: string;
}

declare var Attr: {
    prototype: Attr;
    new(): Attr;
};

interface AudioBuffer {
    readonly duration: number;
    readonly length: number;
    readonly numberOfChannels: number;
    readonly sampleRate: number;
    copyFromChannel(destination: Float32Array, channelNumber: number, startInChannel?: number): void;
    copyToChannel(source: Float32Array, channelNumber: number, startInChannel?: number): void;
    getChannelData(channel: number): Float32Array;
}

declare var AudioBuffer: {
    prototype: AudioBuffer;
    new(): AudioBuffer;
};

interface AudioBufferSourceNodeEventType {
    "ended": Event;
}

interface AudioBufferSourceNode extends AudioNode {
    /*! @ooml-mapto(addEventListener) */ addAudioBufferSourceNodeEventListener<T extends AudioBufferSourceNodeEventType>(type: __Class<T>, listener: EventListener<AudioBufferSourceNode, T>, options?: boolean | AddEventListenerOptions): void;
    /*! @ooml-mapto(removeEventListener) */ removeAudioBufferSourceNodeEventListener<T extends AudioBufferSourceNodeEventType>(type: __Class<T>, listener: EventListener<AudioBufferSourceNode, T>, options?: boolean | EventListenerOptions): void;
    buffer: AudioBuffer | null;
    readonly detune: AudioParam;
    loop: boolean;
    loopEnd: number;
    loopStart: number;
    onended: ((this: AudioBufferSourceNode, ev: Event) => any) | null;
    readonly playbackRate: AudioParam;
    start(when?: number, offset?: number, duration?: number): void;
    stop(when?: number): void;
}

declare var AudioBufferSourceNode: {
    prototype: AudioBufferSourceNode;
    new(): AudioBufferSourceNode;
};

interface AudioContextEventType {
    "statechange": Event;
}

interface AudioContextBase extends EventTarget {
    /*! @ooml-mapto(addEventListener) */ addAudioContextBaseEventListener<T extends AudioContextEventType>(type: __Class<T>, listener: EventListener<AudioContextBase, T>, options?: boolean | AddEventListenerOptions): void;
    /*! @ooml-mapto(removeEventListener) */ removeAudioContextBaseEventListener<T extends AudioContextEventType>(type: __Class<T>, listener: EventListener<AudioContextBase, T>, options?: boolean | EventListenerOptions): void;
    readonly currentTime: number;
    readonly destination: AudioDestinationNode;
    readonly listener: AudioListener;
    readonly sampleRate: number;
    readonly state: AudioContextState;
    close(): Promise<void>;
    createAnalyser(): AnalyserNode;
    createBiquadFilter(): BiquadFilterNode;
    createBuffer(numberOfChannels: number, length: number, sampleRate: number): AudioBuffer;
    createBufferSource(): AudioBufferSourceNode;
    createChannelMerger(numberOfInputs?: number): ChannelMergerNode;
    createChannelSplitter(numberOfOutputs?: number): ChannelSplitterNode;
    createConvolver(): ConvolverNode;
    createDelay(maxDelayTime?: number): DelayNode;
    createDynamicsCompressor(): DynamicsCompressorNode;
    createGain(): GainNode;
    createIIRFilter(feedforward: number[], feedback: number[]): IIRFilterNode;
    createMediaElementSource(mediaElement: HTMLMediaElement): MediaElementAudioSourceNode;
    createMediaStreamSource(mediaStream: MediaStream): MediaStreamAudioSourceNode;
    createOscillator(): OscillatorNode;
    createPanner(): PannerNode;
    createPeriodicWave(real: Float32Array, imag: Float32Array, constraints?: PeriodicWaveConstraints): PeriodicWave;
    createScriptProcessor(bufferSize?: number, numberOfInputChannels?: number, numberOfOutputChannels?: number): ScriptProcessorNode;
    createStereoPanner(): StereoPannerNode;
    createWaveShaper(): WaveShaperNode;
    decodeAudioData(audioData: ArrayBuffer, successCallback?: DecodeSuccessCallback, errorCallback?: DecodeErrorCallback): Promise<AudioBuffer>;
    resume(): Promise<void>;
}

interface AudioContext extends AudioContextBase {
    suspend(): Promise<void>;
}

declare var AudioContext: {
    prototype: AudioContext;
    new(): AudioContext;
};

interface AudioDestinationNode extends AudioNode {
    readonly maxChannelCount: number;
}

declare var AudioDestinationNode: {
    prototype: AudioDestinationNode;
    new(): AudioDestinationNode;
};

interface AudioListener {
    /** @deprecated */
    dopplerFactor: number;
    /** @deprecated */
    speedOfSound: number;
    /** @deprecated */
    setOrientation(x: number, y: number, z: number, xUp: number, yUp: number, zUp: number): void;
    /** @deprecated */
    setPosition(x: number, y: number, z: number): void;
    /** @deprecated */
    setVelocity(x: number, y: number, z: number): void;
}

declare var AudioListener: {
    prototype: AudioListener;
    new(): AudioListener;
};

interface AudioNode extends EventTarget {
    channelCount: number;
    channelCountMode: ChannelCountMode;
    channelInterpretation: ChannelInterpretation;
    readonly context: AudioContext;
    readonly numberOfInputs: number;
    readonly numberOfOutputs: number;
    connect(destination: AudioNode, output?: number, input?: number): AudioNode;
    connect(destination: AudioParam, output?: number): void;
    disconnect(): void;
    disconnect(output: number): void;
    disconnect(destination: AudioNode): void;
    disconnect(destination: AudioNode, output: number): void;
    disconnect(destination: AudioNode, output: number, input: number): void;
    disconnect(destination: AudioParam): void;
    disconnect(destination: AudioParam, output: number): void;
}

declare var AudioNode: {
    prototype: AudioNode;
    new(): AudioNode;
};

interface AudioParam {
    readonly defaultValue: number;
    value: number;
    cancelScheduledValues(cancelTime: number): AudioParam;
    exponentialRampToValueAtTime(value: number, endTime: number): AudioParam;
    linearRampToValueAtTime(value: number, endTime: number): AudioParam;
    setTargetAtTime(target: number, startTime: number, timeConstant: number): AudioParam;
    setValueAtTime(value: number, startTime: number): AudioParam;
    setValueCurveAtTime(values: number[], startTime: number, duration: number): AudioParam;
}

declare var AudioParam: {
    prototype: AudioParam;
    new(): AudioParam;
};

interface AudioProcessingEvent extends Event {
    readonly inputBuffer: AudioBuffer;
    readonly outputBuffer: AudioBuffer;
    readonly playbackTime: number;
}

declare var AudioProcessingEvent: {
    prototype: AudioProcessingEvent;
    new(): AudioProcessingEvent;
};

interface AudioTrack {
    enabled: boolean;
    readonly id: string;
    kind: string;
    readonly label: string;
    language: string;
    readonly sourceBuffer: SourceBuffer;
}

declare var AudioTrack: {
    prototype: AudioTrack;
    new(): AudioTrack;
};

interface AudioTrackListEventType {
    "addtrack": TrackEvent;
    "change": Event;
    "removetrack": TrackEvent;
}

interface AudioTrackList extends EventTarget {
    /*! @ooml-mapto(addEventListener) */ addAudioTrackListEventListener<T extends AudioTrackListEventType>(type: __Class<T>, listener: EventListener<AudioTrackList, T>, options?: boolean | AddEventListenerOptions): void;
    /*! @ooml-mapto(removeEventListener) */ removeAudioTrackListEventListener<T extends AudioTrackListEventType>(type: __Class<T>, listener: EventListener<AudioTrackList, T>, options?: boolean | EventListenerOptions): void;
    readonly length: number;
    getTrackById(id: string): AudioTrack | null;
    item(index: number): AudioTrack;


    [index: number]: AudioTrack;
}

declare var AudioTrackList: {
    prototype: AudioTrackList;
    new(): AudioTrackList;
};

interface BarProp {
    readonly visible: boolean;
}

declare var BarProp: {
    prototype: BarProp;
    new(): BarProp;
};

interface BeforeUnloadEvent extends Event {
    returnValue: any;
}

declare var BeforeUnloadEvent: {
    prototype: BeforeUnloadEvent;
    new(): BeforeUnloadEvent;
};

interface BiquadFilterNode extends AudioNode {
    readonly Q: AudioParam;
    readonly detune: AudioParam;
    readonly frequency: AudioParam;
    readonly gain: AudioParam;
    type: BiquadFilterType;
    getFrequencyResponse(frequencyHz: Float32Array, magResponse: Float32Array, phaseResponse: Float32Array): void;
}

declare var BiquadFilterNode: {
    prototype: BiquadFilterNode;
    new(): BiquadFilterNode;
};

interface Blob {
    readonly size: number;
    readonly type: string;
    msClose(): void;
    msDetachStream(): any;
    slice(start?: number, end?: number, contentType?: string): Blob;
}

declare var Blob: {
    prototype: Blob;
    new (blobParts?: any[], options?: BlobPropertyBag): Blob;
};

interface BlobPropertyBag {
    endings?: string;
    type?: string;
}

interface Body {
    readonly bodyUsed: boolean;
    arrayBuffer(): Promise<ArrayBuffer>;
    blob(): Promise<Blob>;
    formData(): Promise<FormData>;
    json(): Promise<any>;
    text(): Promise<string>;
}

interface BroadcastChannel extends EventTarget {
    /*! @ooml-mapto(addEventListener) */ addBroadcastChannelEventListener<T extends BroadcastChannelEventType>(type: __Class<T>, listener: EventListener<BroadcastChannel, T>, options?: boolean | AddEventListenerOptions): void;
    /*! @ooml-mapto(removeEventListener) */ removeBroadcastChannelEventListener<T extends BroadcastChannelEventType>(type: __Class<T>, listener: EventListener<BroadcastChannel, T>, options?: boolean | EventListenerOptions): void;
    readonly name: string;
    close(): void;
    postMessage(message: any): void;
}

declare var BroadcastChannel: {
    prototype: BroadcastChannel;
    new(name: string): BroadcastChannel;
};

interface BroadcastChannelEventType {
    message: MessageEvent;
    messageerror: MessageEvent;
}

interface ByteLengthQueuingStrategy {
    highWaterMark: number;
    size(chunk?: any): number;
}

declare var ByteLengthQueuingStrategy: {
    prototype: ByteLengthQueuingStrategy;
    new(strategy: QueuingStrategy): ByteLengthQueuingStrategy;
};

interface CDATASection extends Text {
}

declare var CDATASection: {
    prototype: CDATASection;
    new(): CDATASection;
};

interface CSS {
    escape(value: string): string;
    supports(property: string, value?: string): boolean;
}
declare var CSS: CSS;

interface CSSConditionRule extends CSSGroupingRule {
    conditionText: string;
}

declare var CSSConditionRule: {
    prototype: CSSConditionRule;
    new(): CSSConditionRule;
};

interface CSSFontFaceRule extends CSSRule {
    readonly style: CSSStyleDeclaration;
}

declare var CSSFontFaceRule: {
    prototype: CSSFontFaceRule;
    new(): CSSFontFaceRule;
};

interface CSSGroupingRule extends CSSRule {
    readonly cssRules: CSSRuleList;
    deleteRule(index: number): void;
    insertRule(rule: string, index: number): number;
}

declare var CSSGroupingRule: {
    prototype: CSSGroupingRule;
    new(): CSSGroupingRule;
};

interface CSSImportRule extends CSSRule {
    readonly href: string;
    readonly media: MediaList;
    readonly styleSheet: CSSStyleSheet;
}

declare var CSSImportRule: {
    prototype: CSSImportRule;
    new(): CSSImportRule;
};

interface CSSKeyframeRule extends CSSRule {
    keyText: string;
    readonly style: CSSStyleDeclaration;
}

declare var CSSKeyframeRule: {
    prototype: CSSKeyframeRule;
    new(): CSSKeyframeRule;
};

interface CSSKeyframesRule extends CSSRule {
    readonly cssRules: CSSRuleList;
    name: string;
    appendRule(rule: string): void;
    deleteRule(rule: string): void;
    findRule(rule: string): CSSKeyframeRule | null;
}

declare var CSSKeyframesRule: {
    prototype: CSSKeyframesRule;
    new(): CSSKeyframesRule;
};

interface CSSMediaRule extends CSSConditionRule {
    readonly media: MediaList;
}

declare var CSSMediaRule: {
    prototype: CSSMediaRule;
    new(): CSSMediaRule;
};

interface CSSNamespaceRule extends CSSRule {
    readonly namespaceURI: string;
    readonly prefix: string;
}

declare var CSSNamespaceRule: {
    prototype: CSSNamespaceRule;
    new(): CSSNamespaceRule;
};

interface CSSPageRule extends CSSRule {
    readonly pseudoClass: string;
    readonly selector: string;
    selectorText: string;
    readonly style: CSSStyleDeclaration;
}

declare var CSSPageRule: {
    prototype: CSSPageRule;
    new(): CSSPageRule;
};

interface CSSRule {
    cssText: string;
    readonly parentRule: CSSRule | null;
    readonly parentStyleSheet: CSSStyleSheet | null;
    readonly type: number;
}

declare var CSSRule: {
    prototype: CSSRule;
    new(): CSSRule;
    readonly CHARSET_RULE: number;
    readonly FONT_FACE_RULE: number;
    readonly IMPORT_RULE: number;
    readonly KEYFRAMES_RULE: number;
    readonly KEYFRAME_RULE: number;
    readonly MEDIA_RULE: number;
    readonly NAMESPACE_RULE: number;
    readonly PAGE_RULE: number;
    readonly STYLE_RULE: number;
    readonly SUPPORTS_RULE: number;
    readonly UNKNOWN_RULE: number;
    readonly VIEWPORT_RULE: number;
};

interface CSSRuleList {
    readonly length: number;
    item(index: number): CSSRule | null;
    [index: number]: CSSRule;
}

declare var CSSRuleList: {
    prototype: CSSRuleList;
    new(): CSSRuleList;
};

interface CSSStyleDeclaration {
    alignContent: string | null;
    alignItems: string | null;
    alignSelf: string | null;
    alignmentBaseline: string | null;
    animation: string | null;
    animationDelay: string | null;
    animationDirection: string | null;
    animationDuration: string | null;
    animationFillMode: string | null;
    animationIterationCount: string | null;
    animationName: string | null;
    animationPlayState: string | null;
    animationTimingFunction: string | null;
    backfaceVisibility: string | null;
    background: string | null;
    backgroundAttachment: string | null;
    backgroundClip: string | null;
    backgroundColor: string | null;
    backgroundImage: string | null;
    backgroundOrigin: string | null;
    backgroundPosition: string | null;
    backgroundPositionX: string | null;
    backgroundPositionY: string | null;
    backgroundRepeat: string | null;
    backgroundSize: string | null;
    baselineShift: string | null;
    border: string | null;
    borderBottom: string | null;
    borderBottomColor: string | null;
    borderBottomLeftRadius: string | null;
    borderBottomRightRadius: string | null;
    borderBottomStyle: string | null;
    borderBottomWidth: string | null;
    borderCollapse: string | null;
    borderColor: string | null;
    borderImage: string | null;
    borderImageOutset: string | null;
    borderImageRepeat: string | null;
    borderImageSlice: string | null;
    borderImageSource: string | null;
    borderImageWidth: string | null;
    borderLeft: string | null;
    borderLeftColor: string | null;
    borderLeftStyle: string | null;
    borderLeftWidth: string | null;
    borderRadius: string | null;
    borderRight: string | null;
    borderRightColor: string | null;
    borderRightStyle: string | null;
    borderRightWidth: string | null;
    borderSpacing: string | null;
    borderStyle: string | null;
    borderTop: string | null;
    borderTopColor: string | null;
    borderTopLeftRadius: string | null;
    borderTopRightRadius: string | null;
    borderTopStyle: string | null;
    borderTopWidth: string | null;
    borderWidth: string | null;
    bottom: string | null;
    boxShadow: string | null;
    boxSizing: string | null;
    breakAfter: string | null;
    breakBefore: string | null;
    breakInside: string | null;
    captionSide: string | null;
    clear: string | null;
    clip: string | null;
    clipPath: string | null;
    clipRule: string | null;
    color: string | null;
    colorInterpolationFilters: string | null;
    columnCount: any;
    columnFill: string | null;
    columnGap: any;
    columnRule: string | null;
    columnRuleColor: any;
    columnRuleStyle: string | null;
    columnRuleWidth: any;
    columnSpan: string | null;
    columnWidth: any;
    columns: string | null;
    content: string | null;
    counterIncrement: string | null;
    counterReset: string | null;
    cssFloat: string | null;
    cssText: string;
    cursor: string | null;
    direction: string | null;
    display: string | null;
    dominantBaseline: string | null;
    emptyCells: string | null;
    enableBackground: string | null;
    fill: string | null;
    fillOpacity: string | null;
    fillRule: string | null;
    filter: string | null;
    flex: string | null;
    flexBasis: string | null;
    flexDirection: string | null;
    flexFlow: string | null;
    flexGrow: string | null;
    flexShrink: string | null;
    flexWrap: string | null;
    floodColor: string | null;
    floodOpacity: string | null;
    font: string | null;
    fontFamily: string | null;
    fontFeatureSettings: string | null;
    fontSize: string | null;
    fontSizeAdjust: string | null;
    fontStretch: string | null;
    fontStyle: string | null;
    fontVariant: string | null;
    fontWeight: string | null;
    gap: string | null;
    glyphOrientationHorizontal: string | null;
    glyphOrientationVertical: string | null;
    grid: string | null;
    gridArea: string | null;
    gridAutoColumns: string | null;
    gridAutoFlow: string | null;
    gridAutoRows: string | null;
    gridColumn: string | null;
    gridColumnEnd: string | null;
    gridColumnGap: string | null;
    gridColumnStart: string | null;
    gridGap: string | null;
    gridRow: string | null;
    gridRowEnd: string | null;
    gridRowGap: string | null;
    gridRowStart: string | null;
    gridTemplate: string | null;
    gridTemplateAreas: string | null;
    gridTemplateColumns: string | null;
    gridTemplateRows: string | null;
    height: string | null;
    imeMode: string | null;
    justifyContent: string | null;
    justifyItems: string | null;
    justifySelf: string | null;
    kerning: string | null;
    layoutGrid: string | null;
    layoutGridChar: string | null;
    layoutGridLine: string | null;
    layoutGridMode: string | null;
    layoutGridType: string | null;
    left: string | null;
    readonly length: number;
    letterSpacing: string | null;
    lightingColor: string | null;
    lineBreak: string | null;
    lineHeight: string | null;
    listStyle: string | null;
    listStyleImage: string | null;
    listStylePosition: string | null;
    listStyleType: string | null;
    margin: string | null;
    marginBottom: string | null;
    marginLeft: string | null;
    marginRight: string | null;
    marginTop: string | null;
    marker: string | null;
    markerEnd: string | null;
    markerMid: string | null;
    markerStart: string | null;
    mask: string | null;
    maskImage: string | null;
    maxHeight: string | null;
    maxWidth: string | null;
    minHeight: string | null;
    minWidth: string | null;
    msContentZoomChaining: string | null;
    msContentZoomLimit: string | null;
    msContentZoomLimitMax: any;
    msContentZoomLimitMin: any;
    msContentZoomSnap: string | null;
    msContentZoomSnapPoints: string | null;
    msContentZoomSnapType: string | null;
    msContentZooming: string | null;
    msFlowFrom: string | null;
    msFlowInto: string | null;
    msFontFeatureSettings: string | null;
    msGridColumn: any;
    msGridColumnAlign: string | null;
    msGridColumnSpan: any;
    msGridColumns: string | null;
    msGridRow: any;
    msGridRowAlign: string | null;
    msGridRowSpan: any;
    msGridRows: string | null;
    msHighContrastAdjust: string | null;
    msHyphenateLimitChars: string | null;
    msHyphenateLimitLines: any;
    msHyphenateLimitZone: any;
    msHyphens: string | null;
    msImeAlign: string | null;
    msOverflowStyle: string | null;
    msScrollChaining: string | null;
    msScrollLimit: string | null;
    msScrollLimitXMax: any;
    msScrollLimitXMin: any;
    msScrollLimitYMax: any;
    msScrollLimitYMin: any;
    msScrollRails: string | null;
    msScrollSnapPointsX: string | null;
    msScrollSnapPointsY: string | null;
    msScrollSnapType: string | null;
    msScrollSnapX: string | null;
    msScrollSnapY: string | null;
    msScrollTranslation: string | null;
    msTextCombineHorizontal: string | null;
    msTextSizeAdjust: any;
    msTouchAction: string | null;
    msTouchSelect: string | null;
    msUserSelect: string | null;
    msWrapFlow: string;
    msWrapMargin: any;
    msWrapThrough: string;
    objectFit: string | null;
    objectPosition: string | null;
    opacity: string | null;
    order: string | null;
    orphans: string | null;
    outline: string | null;
    outlineColor: string | null;
    outlineOffset: string | null;
    outlineStyle: string | null;
    outlineWidth: string | null;
    overflow: string | null;
    overflowX: string | null;
    overflowY: string | null;
    padding: string | null;
    paddingBottom: string | null;
    paddingLeft: string | null;
    paddingRight: string | null;
    paddingTop: string | null;
    pageBreakAfter: string | null;
    pageBreakBefore: string | null;
    pageBreakInside: string | null;
    readonly parentRule: CSSRule;
    penAction: string | null;
    perspective: string | null;
    perspectiveOrigin: string | null;
    pointerEvents: string | null;
    position: string | null;
    quotes: string | null;
    resize: string | null;
    right: string | null;
    rotate: string | null;
    rowGap: string | null;
    rubyAlign: string | null;
    rubyOverhang: string | null;
    rubyPosition: string | null;
    scale: string | null;
    stopColor: string | null;
    stopOpacity: string | null;
    stroke: string | null;
    strokeDasharray: string | null;
    strokeDashoffset: string | null;
    strokeLinecap: string | null;
    strokeLinejoin: string | null;
    strokeMiterlimit: string | null;
    strokeOpacity: string | null;
    strokeWidth: string | null;
    tableLayout: string | null;
    textAlign: string | null;
    textAlignLast: string | null;
    textAnchor: string | null;
    textCombineUpright: string | null;
    textDecoration: string | null;
    textIndent: string | null;
    textJustify: string | null;
    textKashida: string | null;
    textKashidaSpace: string | null;
    textOverflow: string | null;
    textShadow: string | null;
    textTransform: string | null;
    textUnderlinePosition: string | null;
    top: string | null;
    touchAction: string | null;
    transform: string | null;
    transformOrigin: string | null;
    transformStyle: string | null;
    transition: string | null;
    transitionDelay: string | null;
    transitionDuration: string | null;
    transitionProperty: string | null;
    transitionTimingFunction: string | null;
    translate: string | null;
    unicodeBidi: string | null;
    userSelect: string | null;
    verticalAlign: string | null;
    visibility: string | null;
    webkitAlignContent: string | null;
    webkitAlignItems: string | null;
    webkitAlignSelf: string | null;
    webkitAnimation: string | null;
    webkitAnimationDelay: string | null;
    webkitAnimationDirection: string | null;
    webkitAnimationDuration: string | null;
    webkitAnimationFillMode: string | null;
    webkitAnimationIterationCount: string | null;
    webkitAnimationName: string | null;
    webkitAnimationPlayState: string | null;
    webkitAnimationTimingFunction: string | null;
    webkitAppearance: string | null;
    webkitBackfaceVisibility: string | null;
    webkitBackgroundClip: string | null;
    webkitBackgroundOrigin: string | null;
    webkitBackgroundSize: string | null;
    webkitBorderBottomLeftRadius: string | null;
    webkitBorderBottomRightRadius: string | null;
    webkitBorderImage: string | null;
    webkitBorderRadius: string | null;
    webkitBorderTopLeftRadius: string | null;
    webkitBorderTopRightRadius: string | null;
    webkitBoxAlign: string | null;
    webkitBoxDirection: string | null;
    webkitBoxFlex: string | null;
    webkitBoxOrdinalGroup: string | null;
    webkitBoxOrient: string | null;
    webkitBoxPack: string | null;
    webkitBoxSizing: string | null;
    webkitColumnBreakAfter: string | null;
    webkitColumnBreakBefore: string | null;
    webkitColumnBreakInside: string | null;
    webkitColumnCount: any;
    webkitColumnGap: any;
    webkitColumnRule: string | null;
    webkitColumnRuleColor: any;
    webkitColumnRuleStyle: string | null;
    webkitColumnRuleWidth: any;
    webkitColumnSpan: string | null;
    webkitColumnWidth: any;
    webkitColumns: string | null;
    webkitFilter: string | null;
    webkitFlex: string | null;
    webkitFlexBasis: string | null;
    webkitFlexDirection: string | null;
    webkitFlexFlow: string | null;
    webkitFlexGrow: string | null;
    webkitFlexShrink: string | null;
    webkitFlexWrap: string | null;
    webkitJustifyContent: string | null;
    webkitOrder: string | null;
    webkitPerspective: string | null;
    webkitPerspectiveOrigin: string | null;
    webkitTapHighlightColor: string | null;
    webkitTextFillColor: string | null;
    webkitTextSizeAdjust: any;
    webkitTextStroke: string | null;
    webkitTextStrokeColor: string | null;
    webkitTextStrokeWidth: string | null;
    webkitTransform: string | null;
    webkitTransformOrigin: string | null;
    webkitTransformStyle: string | null;
    webkitTransition: string | null;
    webkitTransitionDelay: string | null;
    webkitTransitionDuration: string | null;
    webkitTransitionProperty: string | null;
    webkitTransitionTimingFunction: string | null;
    webkitUserModify: string | null;
    webkitUserSelect: string | null;
    webkitWritingMode: string | null;
    whiteSpace: string | null;
    widows: string | null;
    width: string | null;
    wordBreak: string | null;
    wordSpacing: string | null;
    wordWrap: string | null;
    writingMode: string | null;
    zIndex: string | null;
    zoom: string | null;
    getPropertyPriority(propertyName: string): string;
    getPropertyValue(propertyName: string): string;
    item(index: number): string;
    removeProperty(propertyName: string): string;
    setProperty(propertyName: string, value: string | null, priority?: string | null): void;
    [index: number]: string;
}

declare var CSSStyleDeclaration: {
    prototype: CSSStyleDeclaration;
    new(): CSSStyleDeclaration;
};

interface CSSStyleRule extends CSSRule {
    selectorText: string;
    readonly style: CSSStyleDeclaration;
}

declare var CSSStyleRule: {
    prototype: CSSStyleRule;
    new(): CSSStyleRule;
};

interface CSSStyleSheet extends StyleSheet {
    readonly cssRules: CSSRuleList;
    /** @deprecated */
    cssText: string;
    /** @deprecated */
    readonly id: string;
    /** @deprecated */
    readonly imports: StyleSheetList;
    /** @deprecated */
    readonly isAlternate: boolean;
    /** @deprecated */
    readonly isPrefAlternate: boolean;
    readonly ownerRule: CSSRule | null;
    /** @deprecated */
    readonly owningElement: Element;
    /** @deprecated */
    readonly pages: any;
    /** @deprecated */
    readonly readOnly: boolean;
    readonly rules: CSSRuleList;
    /** @deprecated */
    addImport(bstrURL: string, lIndex?: number): number;
    /** @deprecated */
    addPageRule(bstrSelector: string, bstrStyle: string, lIndex?: number): number;
    addRule(bstrSelector: string, bstrStyle?: string, lIndex?: number): number;
    deleteRule(index?: number): void;
    insertRule(rule: string, index?: number): number;
    /** @deprecated */
    removeImport(lIndex: number): void;
    removeRule(lIndex: number): void;
}

declare var CSSStyleSheet: {
    prototype: CSSStyleSheet;
    new(): CSSStyleSheet;
};

interface CSSSupportsRule extends CSSConditionRule {
}

declare var CSSSupportsRule: {
    prototype: CSSSupportsRule;
    new(): CSSSupportsRule;
};

interface Cache {
    add(request: Request | string): Promise<void>;
    delete(request: Request | string, options?: CacheQueryOptions): Promise<boolean>;
    keys(request?: Request | string, options?: CacheQueryOptions): Promise<Request[]>;
    match(request: Request | string, options?: CacheQueryOptions): Promise<Response>;
    matchAll(request?: Request | string, options?: CacheQueryOptions): Promise<Response[]>;
    put(request: Request | string, response: Response): Promise<void>;
}

declare var Cache: {
    prototype: Cache;
    new(): Cache;
};

interface CacheStorage {
    delete(cacheName: string): Promise<boolean>;
    has(cacheName: string): Promise<boolean>;
    keys(): Promise<string[]>;
    match(request: Request | string, options?: CacheQueryOptions): Promise<any>;
    open(cacheName: string): Promise<Cache>;
}

declare var CacheStorage: {
    prototype: CacheStorage;
    new(): CacheStorage;
};

interface Canvas2DContextAttributes {
    alpha?: boolean;
    storage?: boolean;
    willReadFrequently?: boolean;
    [attribute: string]: boolean | string | null;
}

interface CanvasGradient {
    addColorStop(offset: number, color: string): void;
}

declare var CanvasGradient: {
    prototype: CanvasGradient;
    new(): CanvasGradient;
};

interface CanvasPathMethods {
    arc(x: number, y: number, radius: number, startAngle: number, endAngle: number, anticlockwise?: boolean): void;
    arcTo(x1: number, y1: number, x2: number, y2: number, radius: number): void;
    arcTo(x1: number, y1: number, x2: number, y2: number, radiusX: number, radiusY: number, rotation: number): void;
    bezierCurveTo(cp1x: number, cp1y: number, cp2x: number, cp2y: number, x: number, y: number): void;
    closePath(): void;
    ellipse(x: number, y: number, radiusX: number, radiusY: number, rotation: number, startAngle: number, endAngle: number, anticlockwise?: boolean): void;
    lineTo(x: number, y: number): void;
    moveTo(x: number, y: number): void;
    quadraticCurveTo(cpx: number, cpy: number, x: number, y: number): void;
    rect(x: number, y: number, w: number, h: number): void;
}

interface CanvasPattern {
    setTransform(matrix: SVGMatrix): void;
}

declare var CanvasPattern: {
    prototype: CanvasPattern;
    new(): CanvasPattern;
};

interface CanvasRenderingContext2D extends CanvasPathMethods {
    readonly canvas: HTMLCanvasElement;
    fillStyle: string | CanvasGradient | CanvasPattern;
    font: string;
    globalAlpha: number;
    globalCompositeOperation: string;
    imageSmoothingEnabled: boolean;
    lineCap: string;
    lineDashOffset: number;
    lineJoin: string;
    lineWidth: number;
    miterLimit: number;
    mozImageSmoothingEnabled: boolean;
    msFillRule: CanvasFillRule;
    oImageSmoothingEnabled: boolean;
    shadowBlur: number;
    shadowColor: string;
    shadowOffsetX: number;
    shadowOffsetY: number;
    strokeStyle: string | CanvasGradient | CanvasPattern;
    textAlign: string;
    textBaseline: string;
    webkitImageSmoothingEnabled: boolean;
    beginPath(): void;
    clearRect(x: number, y: number, w: number, h: number): void;
    clip(fillRule?: CanvasFillRule): void;
    clip(path: Path2D, fillRule?: CanvasFillRule): void;
    createImageData(imageDataOrSw: number | ImageData, sh?: number): ImageData;
    createLinearGradient(x0: number, y0: number, x1: number, y1: number): CanvasGradient;
    createPattern(image: HTMLImageElement | HTMLCanvasElement | HTMLVideoElement, repetition: string): CanvasPattern;
    createRadialGradient(x0: number, y0: number, r0: number, x1: number, y1: number, r1: number): CanvasGradient;
    drawFocusIfNeeded(element: Element): void;
    drawFocusIfNeeded(path: Path2D, element: Element): void;
    drawImage(image: HTMLImageElement | HTMLCanvasElement | HTMLVideoElement | ImageBitmap, dstX: number, dstY: number): void;
    drawImage(image: HTMLImageElement | HTMLCanvasElement | HTMLVideoElement | ImageBitmap, dstX: number, dstY: number, dstW: number, dstH: number): void;
    drawImage(image: HTMLImageElement | HTMLCanvasElement | HTMLVideoElement | ImageBitmap, srcX: number, srcY: number, srcW: number, srcH: number, dstX: number, dstY: number, dstW: number, dstH: number): void;
    fill(fillRule?: CanvasFillRule): void;
    fill(path: Path2D, fillRule?: CanvasFillRule): void;
    fillRect(x: number, y: number, w: number, h: number): void;
    fillText(text: string, x: number, y: number, maxWidth?: number): void;
    getImageData(sx: number, sy: number, sw: number, sh: number): ImageData;
    getLineDash(): number[];
    isPointInPath(x: number, y: number, fillRule?: CanvasFillRule): boolean;
    isPointInPath(path: Path2D, x: number, y: number, fillRule?: CanvasFillRule): boolean;
    isPointInStroke(x: number, y: number, fillRule?: CanvasFillRule): boolean;
    isPointInStroke(path: Path2D, x: number, y: number, fillRule?: CanvasFillRule): boolean;
    measureText(text: string): TextMetrics;
    putImageData(imagedata: ImageData, dx: number, dy: number, dirtyX?: number, dirtyY?: number, dirtyWidth?: number, dirtyHeight?: number): void;
    restore(): void;
    rotate(angle: number): void;
    save(): void;
    scale(x: number, y: number): void;
    setLineDash(segments: number[]): void;
    setTransform(m11: number, m12: number, m21: number, m22: number, dx: number, dy: number): void;
    stroke(path?: Path2D): void;
    strokeRect(x: number, y: number, w: number, h: number): void;
    strokeText(text: string, x: number, y: number, maxWidth?: number): void;
    transform(m11: number, m12: number, m21: number, m22: number, dx: number, dy: number): void;
    translate(x: number, y: number): void;
}

declare var CanvasRenderingContext2D: {
    prototype: CanvasRenderingContext2D;
    new(): CanvasRenderingContext2D;
};

interface ChannelMergerNode extends AudioNode {
}

declare var ChannelMergerNode: {
    prototype: ChannelMergerNode;
    new(): ChannelMergerNode;
};

interface ChannelSplitterNode extends AudioNode {
}

declare var ChannelSplitterNode: {
    prototype: ChannelSplitterNode;
    new(): ChannelSplitterNode;
};

interface CharacterData extends Node {
    data: string;
    readonly length: number;
    appendData(arg: string): void;
    deleteData(offset: number, count: number): void;
    insertData(offset: number, arg: string): void;
    replaceData(offset: number, count: number, arg: string): void;
    substringData(offset: number, count: number): string;
}

declare var CharacterData: {
    prototype: CharacterData;
    new(): CharacterData;
};

interface ClientRect {
    bottom: number;
    readonly height: number;
    left: number;
    right: number;
    top: number;
    readonly width: number;
}

declare var ClientRect: {
    prototype: ClientRect;
    new(): ClientRect;
};

interface ClientRectList {
    readonly length: number;
    item(index: number): ClientRect;
    [index: number]: ClientRect;
}

declare var ClientRectList: {
    prototype: ClientRectList;
    new(): ClientRectList;
};

interface ClipboardEvent extends Event {
    readonly clipboardData: DataTransfer;
}

declare var ClipboardEvent: {
    prototype: ClipboardEvent;
    new(type: string, eventInitDict?: ClipboardEventInit): ClipboardEvent;
};

interface ClipboardEventInit extends EventInit {
    data?: string;
    dataType?: string;
}

interface CloseEvent extends Event {
    readonly code: number;
    readonly reason: string;
    readonly wasClean: boolean;
    /** @deprecated */
    initCloseEvent(typeArg: string, canBubbleArg: boolean, cancelableArg: boolean, wasCleanArg: boolean, codeArg: number, reasonArg: string): void;
}

declare var CloseEvent: {
    prototype: CloseEvent;
    new(type: string, eventInitDict?: CloseEventInit): CloseEvent;
};

interface Comment extends CharacterData {
    text: string;
}

declare var Comment: {
    prototype: Comment;
    new(data?: string): Comment;
};

interface CompositionEvent extends UIEvent {
    readonly data: string;
    readonly locale: string;
    initCompositionEvent(typeArg: string, canBubbleArg: boolean, cancelableArg: boolean, viewArg: Window, dataArg: string, locale: string): void;
}

declare var CompositionEvent: {
    prototype: CompositionEvent;
    new(typeArg: string, eventInitDict?: CompositionEventInit): CompositionEvent;
};

interface ComputedTimingProperties {
    activeDuration: number;
    currentIteration: number | null;
    endTime: number;
    localTime: number | null;
    progress: number | null;
}

interface ConcatParams extends Algorithm {
    algorithmId: Uint8Array;
    hash?: AlgorithmIdentifier;
    partyUInfo: Uint8Array;
    partyVInfo: Uint8Array;
    privateInfo?: Uint8Array;
    publicInfo?: Uint8Array;
}

interface Console {
    memory: any;
    assert(condition?: boolean, message?: string, ...data: any[]): void;
    clear(): void;
    count(label?: string): void;
    debug(message?: any, ...optionalParams: any[]): void;
    dir(value?: any, ...optionalParams: any[]): void;
    dirxml(value: any): void;
    error(message?: any, ...optionalParams: any[]): void;
    exception(message?: string, ...optionalParams: any[]): void;
    group(groupTitle?: string, ...optionalParams: any[]): void;
    groupCollapsed(groupTitle?: string, ...optionalParams: any[]): void;
    groupEnd(): void;
    info(message?: any, ...optionalParams: any[]): void;
    log(message?: any, ...optionalParams: any[]): void;
    markTimeline(label?: string): void;
    msIsIndependentlyComposed(element: Element): boolean;
    profile(reportName?: string): void;
    profileEnd(): void;
    select(element: Element): void;
    table(...tabularData: any[]): void;
    time(label?: string): void;
    timeEnd(label?: string): void;
    timeStamp(label?: string): void;
    timeline(label?: string): void;
    timelineEnd(label?: string): void;
    trace(message?: any, ...optionalParams: any[]): void;
    warn(message?: any, ...optionalParams: any[]): void;
}

declare var Console: {
    prototype: Console;
    new(): Console;
};

interface ConvolverNode extends AudioNode {
    buffer: AudioBuffer | null;
    normalize: boolean;
}

declare var ConvolverNode: {
    prototype: ConvolverNode;
    new(): ConvolverNode;
};

interface Coordinates {
    readonly accuracy: number;
    readonly altitude: number | null;
    readonly altitudeAccuracy: number | null;
    readonly heading: number | null;
    readonly latitude: number;
    readonly longitude: number;
    readonly speed: number | null;
}

declare var Coordinates: {
    prototype: Coordinates;
    new(): Coordinates;
};

interface CountQueuingStrategy {
    highWaterMark: number;
    size(): number;
}

declare var CountQueuingStrategy: {
    prototype: CountQueuingStrategy;
    new(strategy: QueuingStrategy): CountQueuingStrategy;
};

interface Crypto {
    readonly subtle: SubtleCrypto;
    getRandomValues(array: ArrayBufferView | null): ArrayBufferView | null;
}

declare var Crypto: {
    prototype: Crypto;
    new(): Crypto;
};

interface CryptoKey {
    readonly algorithm: KeyAlgorithm;
    readonly extractable: boolean;
    readonly type: string;
    readonly usages: string[];
}

declare var CryptoKey: {
    prototype: CryptoKey;
    new(): CryptoKey;
};

interface CryptoKeyPair {
    privateKey: CryptoKey;
    publicKey: CryptoKey;
}

declare var CryptoKeyPair: {
    prototype: CryptoKeyPair;
    new(): CryptoKeyPair;
};

interface CustomEvent<T = any> extends Event {
    readonly detail: T;
    initCustomEvent(typeArg: string, canBubbleArg: boolean, cancelableArg: boolean, detailArg: T): void;
}

declare var CustomEvent: {
    prototype: CustomEvent;
    new<T>(typeArg: string, eventInitDict?: CustomEventInit<T>): CustomEvent<T>;
};

interface DOMError {
    readonly name: string;
}

declare var DOMError: {
    prototype: DOMError;
    new(): DOMError;
};

interface DOMException {
    readonly code: number;
    readonly message: string;
    readonly name: string;
}

declare var DOMException: {
    prototype: DOMException;
    new(message?: string, name?: string): DOMException;
    readonly ABORT_ERR: number;
    readonly DATA_CLONE_ERR: number;
    readonly DOMSTRING_SIZE_ERR: number;
    readonly HIERARCHY_REQUEST_ERR: number;
    readonly INDEX_SIZE_ERR: number;
    readonly INUSE_ATTRIBUTE_ERR: number;
    readonly INVALID_ACCESS_ERR: number;
    readonly INVALID_CHARACTER_ERR: number;
    readonly INVALID_MODIFICATION_ERR: number;
    readonly INVALID_NODE_TYPE_ERR: number;
    readonly INVALID_STATE_ERR: number;
    readonly NAMESPACE_ERR: number;
    readonly NETWORK_ERR: number;
    readonly NOT_FOUND_ERR: number;
    readonly NOT_SUPPORTED_ERR: number;
    readonly NO_DATA_ALLOWED_ERR: number;
    readonly NO_MODIFICATION_ALLOWED_ERR: number;
    readonly PARSE_ERR: number;
    readonly QUOTA_EXCEEDED_ERR: number;
    readonly SECURITY_ERR: number;
    readonly SERIALIZE_ERR: number;
    readonly SYNTAX_ERR: number;
    readonly TIMEOUT_ERR: number;
    readonly TYPE_MISMATCH_ERR: number;
    readonly URL_MISMATCH_ERR: number;
    readonly VALIDATION_ERR: number;
    readonly WRONG_DOCUMENT_ERR: number;
};

interface DOMImplementation {
    createDocument(namespaceURI: string | null, qualifiedName: string | null, doctype: DocumentType | null): Document;
    createDocumentType(qualifiedName: string, publicId: string, systemId: string): DocumentType;
    createHTMLDocument(title?: string): Document;
    hasFeature(feature: string | null, version: string | null): boolean;
}

declare var DOMImplementation: {
    prototype: DOMImplementation;
    new(): DOMImplementation;
};

interface DOMParser {
    parseFromString(source: string, mimeType: string): Document;
}

declare var DOMParser: {
    prototype: DOMParser;
    new(): DOMParser;
};

interface DOMRect extends DOMRectReadOnly {
    height: number;
    width: number;
    x: number;
    y: number;
}

declare var DOMRect: {
    prototype: DOMRect;
    new (x?: number, y?: number, width?: number, height?: number): DOMRect;
    fromRect(rectangle?: DOMRectInit): DOMRect;
};

interface DOMRectList {
    readonly length: number;
    item(index: number): DOMRect | null;
    [index: number]: DOMRect;
}

interface DOMRectReadOnly {
    readonly bottom: number;
    readonly height: number;
    readonly left: number;
    readonly right: number;
    readonly top: number;
    readonly width: number;
    readonly x: number;
    readonly y: number;
}

declare var DOMRectReadOnly: {
    prototype: DOMRectReadOnly;
    new (x?: number, y?: number, width?: number, height?: number): DOMRectReadOnly;
    fromRect(rectangle?: DOMRectInit): DOMRectReadOnly;
};

interface DOMSettableTokenList extends DOMTokenList {
    value: string;
}

declare var DOMSettableTokenList: {
    prototype: DOMSettableTokenList;
    new(): DOMSettableTokenList;
};

interface DOMStringList {
    readonly length: number;
    contains(str: string): boolean;
    item(index: number): string | null;
    [index: number]: string;
}

declare var DOMStringList: {
    prototype: DOMStringList;
    new(): DOMStringList;
};

interface DOMStringMap {
    [name: string]: string | null;
}

declare var DOMStringMap: {
    prototype: DOMStringMap;
    new(): DOMStringMap;
};

interface DOMTokenList {
    readonly length: number;
    add(...tokens: string[]): void;
    contains(token: string): boolean;
    item(index: number): string | null;
    remove(...tokens: string[]): void;
    replace(oldToken: string, newToken: string): void;
    toggle(token: string, force?: boolean): boolean;
    [index: number]: string;
}

declare var DOMTokenList: {
    prototype: DOMTokenList;
    new(): DOMTokenList;
};

interface DataCue extends TextTrackCue {
    /*! @ooml-mapto(addEventListener) */ addDataCueEventListener<T extends TextTrackCueEventType>(type: __Class<T>, listener: EventListener<DataCue, T>, options?: boolean | AddEventListenerOptions): void;
    /*! @ooml-mapto(removeEventListener) */ removeDataCueEventListener<T extends TextTrackCueEventType>(type: __Class<T>, listener: EventListener<DataCue, T>, options?: boolean | EventListenerOptions): void;
    data: ArrayBuffer;
}

declare var DataCue: {
    prototype: DataCue;
    new(): DataCue;
};

interface DataTransfer {
    dropEffect: string;
    effectAllowed: string;
    readonly files: FileList;
    readonly items: DataTransferItemList;
    readonly types: string[];
    clearData(format?: string): boolean;
    getData(format: string): string;
    setData(format: string, data: string): boolean;
    setDragImage(image: Element, x: number, y: number): void;
}

declare var DataTransfer: {
    prototype: DataTransfer;
    new(): DataTransfer;
};

interface DataTransferItem {
    readonly kind: string;
    readonly type: string;
    getAsFile(): File | null;
    getAsString(_callback: FunctionStringCallback | null): void;
    webkitGetAsEntry(): any;
}

declare var DataTransferItem: {
    prototype: DataTransferItem;
    new(): DataTransferItem;
};

interface DataTransferItemList {
    readonly length: number;
    add(data: File): DataTransferItem | null;
    add(data: string, type: string): DataTransferItem | null;
    clear(): void;
    item(index: number): DataTransferItem;
    remove(index: number): void;
    [name: number]: DataTransferItem;
}

declare var DataTransferItemList: {
    prototype: DataTransferItemList;
    new(): DataTransferItemList;
};

interface DeferredPermissionRequest {
    readonly id: number;
    readonly type: MSWebViewPermissionType;
    readonly uri: string;
    allow(): void;
    deny(): void;
}

declare var DeferredPermissionRequest: {
    prototype: DeferredPermissionRequest;
    new(): DeferredPermissionRequest;
};

interface DelayNode extends AudioNode {
    readonly delayTime: AudioParam;
}

declare var DelayNode: {
    prototype: DelayNode;
    new(): DelayNode;
};

interface DeviceAcceleration {
    readonly x: number | null;
    readonly y: number | null;
    readonly z: number | null;
}

declare var DeviceAcceleration: {
    prototype: DeviceAcceleration;
    new(): DeviceAcceleration;
};

interface DeviceLightEvent extends Event {
    readonly value: number;
}

declare var DeviceLightEvent: {
    prototype: DeviceLightEvent;
    new(typeArg: string, eventInitDict?: DeviceLightEventInit): DeviceLightEvent;
};

interface DeviceMotionEvent extends Event {
    readonly acceleration: DeviceAcceleration | null;
    readonly accelerationIncludingGravity: DeviceAcceleration | null;
    readonly interval: number | null;
    readonly rotationRate: DeviceRotationRate | null;
    initDeviceMotionEvent(type: string, bubbles: boolean, cancelable: boolean, acceleration: DeviceAccelerationDict | null, accelerationIncludingGravity: DeviceAccelerationDict | null, rotationRate: DeviceRotationRateDict | null, interval: number | null): void;
}

declare var DeviceMotionEvent: {
    prototype: DeviceMotionEvent;
    new(typeArg: string, eventInitDict?: DeviceMotionEventInit): DeviceMotionEvent;
};

interface DeviceOrientationEvent extends Event {
    readonly absolute: boolean;
    readonly alpha: number | null;
    readonly beta: number | null;
    readonly gamma: number | null;
    initDeviceOrientationEvent(type: string, bubbles: boolean, cancelable: boolean, alpha: number | null, beta: number | null, gamma: number | null, absolute: boolean): void;
}

declare var DeviceOrientationEvent: {
    prototype: DeviceOrientationEvent;
    new(typeArg: string, eventInitDict?: DeviceOrientationEventInit): DeviceOrientationEvent;
};

interface DeviceRotationRate {
    readonly alpha: number | null;
    readonly beta: number | null;
    readonly gamma: number | null;
}

declare var DeviceRotationRate: {
    prototype: DeviceRotationRate;
    new(): DeviceRotationRate;
};

interface DhImportKeyParams extends Algorithm {
    generator: Uint8Array;
    prime: Uint8Array;
}

interface DhKeyAlgorithm extends KeyAlgorithm {
    generator: Uint8Array;
    prime: Uint8Array;
}

interface DhKeyDeriveParams extends Algorithm {
    public: CryptoKey;
}

interface DhKeyGenParams extends Algorithm {
    generator: Uint8Array;
    prime: Uint8Array;
}

interface DocumentEventType extends GlobalEventHandlersEventType {
    "abort": UIEvent;
    "activate": Event;
    "beforeactivate": Event;
    "beforedeactivate": Event;
    "blur": FocusEvent;
    "canplay": Event;
    "canplaythrough": Event;
    "change": Event;
    "click": MouseEvent;
    "contextmenu": PointerEvent;
    "dblclick": MouseEvent;
    "deactivate": Event;
    "drag": DragEvent;
    "dragend": DragEvent;
    "dragenter": DragEvent;
    "dragleave": DragEvent;
    "dragover": DragEvent;
    "dragstart": DragEvent;
    "drop": DragEvent;
    "durationchange": Event;
    "emptied": Event;
    "ended": Event;
    "error": ErrorEvent;
    "focus": FocusEvent;
    "fullscreenchange": Event;
    "fullscreenerror": Event;
    "input": Event;
    "invalid": Event;
    "keydown": KeyboardEvent;
    "keypress": KeyboardEvent;
    "keyup": KeyboardEvent;
    "load": Event;
    "loadeddata": Event;
    "loadedmetadata": Event;
    "loadstart": Event;
    "mousedown": MouseEvent;
    "mousemove": MouseEvent;
    "mouseout": MouseEvent;
    "mouseover": MouseEvent;
    "mouseup": MouseEvent;
    "mousewheel": WheelEvent;
    "MSContentZoom": Event;
    "MSGestureChange": Event;
    "MSGestureDoubleTap": Event;
    "MSGestureEnd": Event;
    "MSGestureHold": Event;
    "MSGestureStart": Event;
    "MSGestureTap": Event;
    "MSInertiaStart": Event;
    "MSManipulationStateChanged": Event;
    "MSPointerCancel": Event;
    "MSPointerDown": Event;
    "MSPointerEnter": Event;
    "MSPointerLeave": Event;
    "MSPointerMove": Event;
    "MSPointerOut": Event;
    "MSPointerOver": Event;
    "MSPointerUp": Event;
    "mssitemodejumplistitemremoved": Event;
    "msthumbnailclick": Event;
    "pause": Event;
    "play": Event;
    "playing": Event;
    "pointerlockchange": Event;
    "pointerlockerror": Event;
    "progress": ProgressEvent;
    "ratechange": Event;
    "readystatechange": Event;
    "reset": Event;
    "scroll": UIEvent;
    "seeked": Event;
    "seeking": Event;
    "select": UIEvent;
    "selectionchange": Event;
    "selectstart": Event;
    "stalled": Event;
    "stop": Event;
    "submit": Event;
    "suspend": Event;
    "timeupdate": Event;
    "touchcancel": TouchEvent;
    "touchend": TouchEvent;
    "touchmove": TouchEvent;
    "touchstart": TouchEvent;
    "volumechange": Event;
    "waiting": Event;
    "webkitfullscreenchange": Event;
    "webkitfullscreenerror": Event;
}

interface Document extends Node, GlobalEventHandlers, ParentNode {
    /*! @ooml-mapto(addEventListener) */ addDocumentEventListener<T extends DocumentEventType>(type: __Class<T>, listener: EventListener<Document, T>, options?: boolean | AddEventListenerOptions): void;
    /*! @ooml-mapto(removeEventListener) */ removeDocumentEventListener<T extends DocumentEventType>(type: __Class<T>, listener: EventListener<Document, T>, options?: boolean | EventListenerOptions): void;
    /**
     * Sets or gets the URL for the current document.
     */
    readonly URL: string;
    /**
     * Gets the URL for the document, stripped of any character encoding.
     */
    readonly URLUnencoded: string;
    /**
     * Gets the object that has the focus when the parent document has focus.
     */
    readonly activeElement: Element;
    /**
     * Sets or gets the color of all active links in the document.
     */
    alinkColor: string;
    /**
     * Returns a reference to the collection of elements contained by the object.
     */
    readonly all: HTMLAllCollection;
    /**
     * Retrieves a collection of all a objects that have a name and/or id property. Objects in this collection are in HTML source order.
     */
    readonly anchors: HTMLCollection<HTMLAnchorElement>;
    /**
     * Retrieves a collection of all applet objects in the document.
     */
    readonly applets: HTMLCollection<HTMLAppletElement>;
    /**
     * Deprecated. Sets or retrieves a value that indicates the background color behind the object.
     */
    bgColor: string;
    /**
     * Specifies the beginning and end of the document body.
     */
    body: HTMLElement;
    readonly characterSet: string;
    /**
     * Gets or sets the character set used to encode the object.
     */
    charset: string;
    /**
     * Gets a value that indicates whether standards-compliant mode is switched on for the object.
     */
    readonly compatMode: string;
    cookie: string;
    readonly currentScript: HTMLScriptElement | SVGScriptElement | null;
    readonly defaultView: Window;
    /**
     * Sets or gets a value that indicates whether the document can be edited.
     */
    designMode: string;
    /**
     * Sets or retrieves a value that indicates the reading order of the object.
     */
    dir: string;
    /**
     * Gets an object representing the document type declaration associated with the current document.
     */
    readonly doctype: DocumentType;
    /**
     * Gets a reference to the root node of the document.
     */
    readonly documentElement: HTMLElement;
    /**
     * Sets or gets the security domain of the document.
     */
    domain: string;
    /**
     * Retrieves a collection of all embed objects in the document.
     */
    readonly embeds: HTMLCollection<HTMLEmbedElement>;
    /**
     * Sets or gets the foreground (text) color of the document.
     */
    fgColor: string;
    /**
     * Retrieves a collection, in source order, of all form objects in the document.
     */
    readonly forms: HTMLCollection<HTMLFormElement>;
    readonly fullscreenElement: Element | null;
    readonly fullscreenEnabled: boolean;
    readonly head: HTMLHeadElement;
    readonly hidden: boolean;
    /**
     * Retrieves a collection, in source order, of img objects in the document.
     */
    readonly images: HTMLCollection<HTMLImageElement>;
    /**
     * Gets the implementation object of the current document.
     */
    readonly implementation: DOMImplementation;
    /**
     * Returns the character encoding used to create the webpage that is loaded into the document object.
     */
    readonly inputEncoding: string | null;
    /**
     * Gets the date that the page was last modified, if the page supplies one.
     */
    readonly lastModified: string;
    /**
     * Sets or gets the color of the document links.
     */
    linkColor: string;
    /**
     * Retrieves a collection of all a objects that specify the href property and all area objects in the document.
     */
    readonly links: HTMLCollection<HTMLHyperlinkElement>;
    /**
     * Contains information about the current URL.
     */
    location: Location;
    msCSSOMElementFloatMetrics: boolean;
    msCapsLockWarningOff: boolean;
    readonly plugins: HTMLCollection<HTMLEmbedElement>;
    readonly pointerLockElement: Element;
    /**
     * Retrieves a value that indicates the current state of the object.
     */
    readonly readyState: DocumentReadyState;
    /**
     * Gets the URL of the location that referred the user to the current page.
     */
    readonly referrer: string;
    /**
     * Gets the root svg element in the document hierarchy.
     */
    readonly rootElement: SVGSVGElement;
    /**
     * Retrieves a collection of all script objects in the document.
     */
    readonly scripts: HTMLCollection<HTMLScriptElement>;
    readonly scrollingElement: Element | null;
    /**
     * Retrieves a collection of styleSheet objects representing the style sheets that correspond to each instance of a link or style object in the document.
     */
    readonly styleSheets: StyleSheetList;
    /**
     * Contains the title of the document.
     */
    title: string;
    readonly visibilityState: VisibilityState;
    /**
     * Sets or gets the color of the links that the user has visited.
     */
    vlinkColor: string;
    readonly webkitCurrentFullScreenElement: Element | null;
    readonly webkitFullscreenElement: Element | null;
    readonly webkitFullscreenEnabled: boolean;
    readonly webkitIsFullScreen: boolean;
    readonly xmlEncoding: string | null;
    xmlStandalone: boolean;
    /**
     * Gets or sets the version attribute specified in the declaration of an XML document.
     */
    xmlVersion: string | null;
    adoptNode<T extends Node>(source: T): T;
    captureEvents(): void;
    caretRangeFromPoint(x: number, y: number): Range;
    clear(): void;
    /**
     * Closes an output stream and forces the sent data to display.
     */
    close(): void;
    /**
     * Creates an attribute object with a specified name.
     * @param name String that sets the attribute object's name.
     */
    createAttribute(name: string): Attr;
    createAttributeNS(namespaceURI: string | null, qualifiedName: string): Attr;
    createCDATASection(data: string): CDATASection;
    /**
     * Creates a comment object with the specified data.
     * @param data Sets the comment object's data.
     */
    createComment(data: string): Comment;
    /**
     * Creates a new document.
     */
    createDocumentFragment(): DocumentFragment;
    /**
     * Creates an instance of the element for the specified tag.
     * @param tagName The name of an element.
     */
    createElement<K extends HTMLElement>(tagName: __Class<K>, options?: ElementCreationOptions): K;
    createElement(tagName: string, options?: ElementCreationOptions): HTMLElement;
    createElementNS(namespaceURI: string | null, qualifiedName: string): Element;
    createExpression(expression: string, resolver: XPathNSResolver): XPathExpression;
    createNSResolver(nodeResolver: Node): XPathNSResolver;
    /**
     * Creates a NodeIterator object that you can use to traverse filtered lists of nodes or elements in a document.
     * @param root The root element or node to start traversing on.
     * @param whatToShow The type of nodes or elements to appear in the node list
     * @param filter A custom NodeFilter function to use. For more information, see filter. Use null for no filter.
     * @param entityReferenceExpansion A flag that specifies whether entity reference nodes are expanded.
     */
    createNodeIterator(root: Node, whatToShow?: number, filter?: NodeFilter, entityReferenceExpansion?: boolean): NodeIterator;
    createProcessingInstruction(target: string, data: string): ProcessingInstruction;
    /**
     *  Returns an empty range object that has both of its boundary points positioned at the beginning of the document.
     */
    createRange(): Range;
    /**
     * Creates a text string from the specified value.
     * @param data String that specifies the nodeValue property of the text node.
     */
    createTextNode(data: string): Text;
    createTouch(view: Window, target: EventTarget, identifier: number, pageX: number, pageY: number, screenX: number, screenY: number): Touch;
    createTouchList(...touches: Touch[]): TouchList;
    /**
     * Creates a TreeWalker object that you can use to traverse filtered lists of nodes or elements in a document.
     * @param root The root element or node to start traversing on.
     * @param whatToShow The type of nodes or elements to appear in the node list. For more information, see whatToShow.
     * @param filter A custom NodeFilter function to use.
     * @param entityReferenceExpansion A flag that specifies whether entity reference nodes are expanded.
     */
    createTreeWalker(root: Node, whatToShow?: number, filter?: NodeFilter, entityReferenceExpansion?: boolean): TreeWalker;
    /**
     * Returns the element for the specified x coordinate and the specified y coordinate.
     * @param x The x-offset
     * @param y The y-offset
     */
    elementFromPoint(x: number, y: number): Element;
    elementsFromPoint(x: number, y: number): Element[];
    evaluate(expression: string, contextNode: Node, resolver: XPathNSResolver | null, type: number, result: XPathResult | null): XPathResult;
    /**
     * Executes a command on the current document, current selection, or the given range.
     * @param commandId String that specifies the command to execute. This command can be any of the command identifiers that can be executed in script.
     * @param showUI Display the user interface, defaults to false.
     * @param value Value to assign.
     */
    execCommand(commandId: string, showUI?: boolean, value?: any): boolean;
    /**
     * Displays help information for the given command identifier.
     * @param commandId Displays help information for the given command identifier.
     */
    execCommandShowHelp(commandId: string): boolean;
    exitFullscreen(): void;
    exitPointerLock(): void;
    /**
     * Causes the element to receive the focus and executes the code specified by the onfocus event.
     */
    /** @deprecated */
    focus(): void;
    /**
     * Returns a reference to the first object with the specified value of the ID or NAME attribute.
     * @param elementId String that specifies the ID value. Case-insensitive.
     */
    getElementById(elementId: string): HTMLElement | null;
    getElementsByClassName(classNames: string): HTMLCollection<Element>;
    /**
     * Gets a collection of objects based on the value of the NAME or ID attribute.
     * @param elementName Gets a collection of objects based on the value of the NAME or ID attribute.
     */
    getElementsByName(elementName: string): NodeList<HTMLElement>;
    /**
     * Retrieves a collection of objects based on the specified element name.
     * @param name Specifies the name of an element.
     */
    getElementsByTagName<K extends Element>(tagname: __Class<K>): NodeList<K>;
    getElementsByTagName(tagname: string): NodeList<Element>;
    getElementsByTagNameNS(namespaceURI: string, localName: string): HTMLCollection<Element>;
    /**
     * Returns an object representing the current selection of the document that is loaded into the object displaying a webpage.
     */
    getSelection(): Selection;
    /**
     * Gets a value indicating whether the object currently has focus.
     */
    hasFocus(): boolean;
    importNode<T extends Node>(importedNode: T, deep: boolean): T;
    msElementsFromPoint(x: number, y: number): NodeList<Element>;
    msElementsFromRect(left: number, top: number, width: number, height: number): NodeList<Element>;
    /**
     * Opens a new window and loads a document specified by a given URL. Also, opens a new window that uses the url parameter and the name parameter to collect the output of the write method and the writeln method.
     * @param url Specifies a MIME type for the document.
     * @param name Specifies the name of the window. This name is used as the value for the TARGET attribute on a form or an anchor element.
     * @param features Contains a list of items separated by commas. Each item consists of an option and a value, separated by an equals sign (for example, "fullscreen=yes, toolbar=yes"). The following values are supported.
     * @param replace Specifies whether the existing entry for the document is replaced in the history list.
     */
    open(url?: string, name?: string, features?: string, replace?: boolean): Document;
    /**
     * Returns a Boolean value that indicates whether a specified command can be successfully executed using execCommand, given the current state of the document.
     * @param commandId Specifies a command identifier.
     */
    queryCommandEnabled(commandId: string): boolean;
    /**
     * Returns a Boolean value that indicates whether the specified command is in the indeterminate state.
     * @param commandId String that specifies a command identifier.
     */
    queryCommandIndeterm(commandId: string): boolean;
    /**
     * Returns a Boolean value that indicates the current state of the command.
     * @param commandId String that specifies a command identifier.
     */
    queryCommandState(commandId: string): boolean;
    /**
     * Returns a Boolean value that indicates whether the current command is supported on the current range.
     * @param commandId Specifies a command identifier.
     */
    queryCommandSupported(commandId: string): boolean;
    /**
     * Retrieves the string associated with a command.
     * @param commandId String that contains the identifier of a command. This can be any command identifier given in the list of Command Identifiers.
     */
    queryCommandText(commandId: string): string;
    /**
     * Returns the current value of the document, range, or current selection for the given command.
     * @param commandId String that specifies a command identifier.
     */
    queryCommandValue(commandId: string): string;
    releaseEvents(): void;
    updateSettings(): void;
    webkitCancelFullScreen(): void;
    webkitExitFullscreen(): void;
    /**
     * Writes one or more HTML expressions to a document in the specified window.
     * @param content Specifies the text and HTML tags to write.
     */
    write(...content: string[]): void;
    /**
     * Writes one or more HTML expressions, followed by a carriage return, to a document in the specified window.
     * @param content The text and HTML tags to write.
     */
    writeln(...content: string[]): void;
}

declare var Document: {
    prototype: Document;
    new(): Document;
};

interface DocumentFragment extends Node, ParentNode {
    getElementById(elementId: string): HTMLElement | null;
}

declare var DocumentFragment: {
    prototype: DocumentFragment;
    new(): DocumentFragment;
};

interface DocumentOrShadowRoot /*! @ooml-interface */ {
    readonly activeElement: Element | null;
    readonly styleSheets: StyleSheetList;
    elementFromPoint(x: number, y: number): Element | null;
    elementsFromPoint(x: number, y: number): Element[];
    getSelection(): Selection | null;
}

interface DocumentType extends Node {
    readonly entities: NamedNodeMap;
    readonly internalSubset: string | null;
    readonly name: string;
    readonly notations: NamedNodeMap;
    readonly publicId: string;
    readonly systemId: string;
}

declare var DocumentType: {
    prototype: DocumentType;
    new(): DocumentType;
};

interface DragEvent extends MouseEvent {
    readonly dataTransfer: DataTransfer;
    initDragEvent(typeArg: string, canBubbleArg: boolean, cancelableArg: boolean, viewArg: Window, detailArg: number, screenXArg: number, screenYArg: number, clientXArg: number, clientYArg: number, ctrlKeyArg: boolean, altKeyArg: boolean, shiftKeyArg: boolean, metaKeyArg: boolean, buttonArg: number, relatedTargetArg: EventTarget, dataTransferArg: DataTransfer): void;
    msConvertURL(file: File, targetType: string, targetURL?: string): void;
}

declare var DragEvent: {
    prototype: DragEvent;
    new(type: "drag" | "dragend" | "dragenter" | "dragexit" | "dragleave" | "dragover" | "dragstart" | "drop", dragEventInit?: { dataTransfer?: DataTransfer; }): DragEvent;
};

interface DynamicsCompressorNode extends AudioNode {
    readonly attack: AudioParam;
    readonly knee: AudioParam;
    readonly ratio: AudioParam;
    readonly reduction: number;
    readonly release: AudioParam;
    readonly threshold: AudioParam;
}

declare var DynamicsCompressorNode: {
    prototype: DynamicsCompressorNode;
    new(): DynamicsCompressorNode;
};

interface EXT_blend_minmax {
    readonly MAX_EXT: number;
    readonly MIN_EXT: number;
}

interface EXT_frag_depth {
}

interface EXT_sRGB {
    readonly FRAMEBUFFER_ATTACHMENT_COLOR_ENCODING_EXT: number;
    readonly SRGB8_ALPHA8_EXT: number;
    readonly SRGB_ALPHA_EXT: number;
    readonly SRGB_EXT: number;
}

interface EXT_shader_texture_lod {
}

interface EXT_texture_filter_anisotropic {
}

declare var EXT_texture_filter_anisotropic: {
    prototype: EXT_texture_filter_anisotropic;
    new(): EXT_texture_filter_anisotropic;
    readonly MAX_TEXTURE_MAX_ANISOTROPY_EXT: number;
    readonly TEXTURE_MAX_ANISOTROPY_EXT: number;
};

interface ElementEventType extends GlobalEventHandlersEventType {
    "ariarequest": Event;
    "command": Event;
    "gotpointercapture": PointerEvent;
    "lostpointercapture": PointerEvent;
    "MSGestureChange": Event;
    "MSGestureDoubleTap": Event;
    "MSGestureEnd": Event;
    "MSGestureHold": Event;
    "MSGestureStart": Event;
    "MSGestureTap": Event;
    "MSGotPointerCapture": Event;
    "MSInertiaStart": Event;
    "MSLostPointerCapture": Event;
    "MSPointerCancel": Event;
    "MSPointerDown": Event;
    "MSPointerEnter": Event;
    "MSPointerLeave": Event;
    "MSPointerMove": Event;
    "MSPointerOut": Event;
    "MSPointerOver": Event;
    "MSPointerUp": Event;
    "touchcancel": TouchEvent;
    "touchend": TouchEvent;
    "touchmove": TouchEvent;
    "touchstart": TouchEvent;
    "webkitfullscreenchange": Event;
    "webkitfullscreenerror": Event;
}

interface Element extends Node, GlobalEventHandlers, ParentNode /*! @ooml-abstract */ {
    /*! @ooml-mapto(addEventListener) */ addElementEventListener<T extends ElementEventType>(type: __Class<T>, listener: EventListener<Element, T>, options?: boolean | AddEventListenerOptions): void;
    /*! @ooml-mapto(removeEventListener) */ removeElementEventListener<T extends ElementEventType>(type: __Class<T>, listener: EventListener<Element, T>, options?: boolean | EventListenerOptions): void;
    readonly assignedSlot: HTMLSlotElement | null;
    readonly attributes: NamedNodeMap;
    readonly classList: DOMTokenList;
    className: string;
    readonly clientHeight: number;
    readonly clientLeft: number;
    readonly clientTop: number;
    readonly clientWidth: number;
    id: string;
    innerHTML: string;
    msContentZoomFactor: number;
    readonly msRegionOverflow: string;
    outerHTML: string;
    readonly prefix: string | null;
    readonly scrollHeight: number;
    scrollLeft: number;
    scrollTop: number;
    readonly scrollWidth: number;
    readonly shadowRoot: ShadowRoot | null;
    slot: string;
    readonly tagName: string;
    attachShadow(shadowRootInitDict: ShadowRootInit): ShadowRoot;
    closest(selector: string): Element | null;
    getAttribute(qualifiedName: string): string | null;
    getAttributeNS(namespaceURI: string, localName: string): string;
    getAttributeNode(name: string): Attr | null;
    getAttributeNodeNS(namespaceURI: string, localName: string): Attr | null;
    getBoundingClientRect(): ClientRect | DOMRect;
    getClientRects(): ClientRectList | DOMRectList;
    getElementsByClassName(classNames: string): NodeList<Element>;
    getElementsByTagName(name: string): NodeList<Element>;
    getElementsByTagNameNS(namespaceURI: string, localName: string): HTMLCollection<Element>;
    hasAttribute(name: string): boolean;
    hasAttributeNS(namespaceURI: string, localName: string): boolean;
    hasAttributes(): boolean;
    insertAdjacentElement(position: InsertPosition, insertedElement: Element): Element | null;
    insertAdjacentHTML(where: InsertPosition, html: string): void;
    insertAdjacentText(where: InsertPosition, text: string): void;
    matches(selectors: string): boolean;
    msGetRegionContent(): any;
    msGetUntransformedBounds(): ClientRect;
    msMatchesSelector(selectors: string): boolean;
    msReleasePointerCapture(pointerId: number): void;
    msSetPointerCapture(pointerId: number): void;
    msZoomTo(args: MsZoomToOptions): void;
    releasePointerCapture(pointerId: number): void;
    removeAttribute(qualifiedName: string): void;
    removeAttributeNS(namespaceURI: string, localName: string): void;
    removeAttributeNode(oldAttr: Attr): Attr;
    requestFullscreen(): void;
    requestPointerLock(): void;
    scroll(options?: ScrollToOptions): void;
    scroll(x: number, y: number): void;
    scrollBy(options?: ScrollToOptions): void;
    scrollBy(x: number, y: number): void;
    scrollIntoView(arg?: boolean | ScrollIntoViewOptions): void;
    scrollTo(options?: ScrollToOptions): void;
    scrollTo(x: number, y: number): void;
    setAttribute(qualifiedName: string, value: string): void;
    setAttributeNS(namespaceURI: string, qualifiedName: string, value: string): void;
    setAttributeNode(newAttr: Attr): Attr;
    setAttributeNodeNS(newAttr: Attr): Attr;
    setPointerCapture(pointerId: number): void;
    webkitMatchesSelector(selectors: string): boolean;
    webkitRequestFullScreen(): void;
    webkitRequestFullscreen(): void;

    readonly nextElementSibling: Element | null;
    readonly previousElementSibling: Element | null;
}

declare var Element: {
    prototype: Element;
    new(): Element;
};

interface ElementCSSInlineStyle /*! @ooml-interface */ {
    readonly style: CSSStyleDeclaration;
}

interface ElementCreationOptions {
    is?: string;
}

interface ElementDefinitionOptions {
    extends: string;
}

interface ErrorEvent extends Event {
    readonly colno: number;
    readonly error: any;
    readonly filename: string;
    readonly lineno: number;
    readonly message: string;
    initErrorEvent(typeArg: string, canBubbleArg: boolean, cancelableArg: boolean, messageArg: string, filenameArg: string, linenoArg: number): void;
}

declare var ErrorEvent: {
    prototype: ErrorEvent;
    new(typeArg: string, eventInitDict?: ErrorEventInit): ErrorEvent;
};

interface Event {
    readonly bubbles: boolean;
    cancelBubble: boolean;
    readonly cancelable: boolean;
    readonly currentTarget: EventTarget | null;
    readonly defaultPrevented: boolean;
    readonly eventPhase: number;
    readonly isTrusted: boolean;
    returnValue: boolean;
    readonly scoped: boolean;
    readonly srcElement: Element | null;
    readonly target: EventTarget | null;
    readonly timeStamp: number;
    readonly type: string;
    deepPath(): EventTarget[];
    initEvent(type: string, bubbles?: boolean, cancelable?: boolean): void;
    preventDefault(): void;
    stopImmediatePropagation(): void;
    stopPropagation(): void;
}

declare var Event: {
    prototype: Event;
    new(typeArg: string, eventInitDict?: EventInit): Event;
    readonly AT_TARGET: number;
    readonly BUBBLING_PHASE: number;
    readonly CAPTURING_PHASE: number;
    readonly NONE: number;
};

interface EventListener<Target, SpecificType> {
  (this: Target, event: SpecificType): any;
}

interface EventSource extends EventTarget {
    readonly CLOSED: number;
    readonly CONNECTING: number;
    readonly OPEN: number;
    onerror: (evt: MessageEvent) => any;
    onmessage: (evt: MessageEvent) => any;
    onopen: (evt: MessageEvent) => any;
    readonly readyState: number;
    readonly url: string;
    readonly withCredentials: boolean;
    close(): void;
}

declare var EventSource: {
    prototype: EventSource;
    new(url: string, eventSourceInitDict?: EventSourceInit): EventSource;
};

interface EventSourceInit {
    readonly withCredentials: boolean;
}

interface EventTarget {
    dispatchEvent(evt: Event): boolean;
}

interface External {
}

declare var External: {
    prototype: External;
    new(): External;
};

interface File extends Blob {
    readonly lastModified: number;
    /** @deprecated */
    readonly lastModifiedDate: Date;
    readonly name: string;
    readonly webkitRelativePath: string;
}

declare var File: {
    prototype: File;
    new (parts: any[], filename: string, properties?: FilePropertyBag): File;
};

interface FileList {
    readonly length: number;
    item(index: number): File | null;
    [index: number]: File;
}

declare var FileList: {
    prototype: FileList;
    new(): FileList;
};

interface FilePropertyBag extends BlobPropertyBag {
    lastModified?: number;
}

interface FileReaderEventType {
    "abort": ProgressEvent;
    "error": ProgressEvent;
    "load": ProgressEvent;
    "loadend": ProgressEvent;
    "loadstart": ProgressEvent;
    "progress": ProgressEvent;
}

interface FileReader extends EventTarget {
    /*! @ooml-mapto(addEventListener) */ addFileReaderEventListener<T extends FileReaderEventType>(type: __Class<T>, listener: EventListener<FileReader, T>, options?: boolean | AddEventListenerOptions): void;
    /*! @ooml-mapto(removeEventListener) */ removeFileReaderEventListener<T extends FileReaderEventType>(type: __Class<T>, listener: EventListener<FileReader, T>, options?: boolean | EventListenerOptions): void;
    readonly error: DOMException | null;
    readonly readyState: number;
    readonly result: any;
    abort(): void;
    readAsArrayBuffer(blob: Blob): void;
    readAsBinaryString(blob: Blob): void;
    readAsDataURL(blob: Blob): void;
    readAsText(blob: Blob, label?: string): void;
}

declare var FileReader: {
    prototype: FileReader;
    new(): FileReader;
    readonly DONE: number;
    readonly EMPTY: number;
    readonly LOADING: number;
};

interface FileReaderProgressEvent extends ProgressEvent {
    readonly target: FileReader | null;
}

interface FocusEvent extends UIEvent {
    readonly relatedTarget: EventTarget;
    initFocusEvent(typeArg: string, canBubbleArg: boolean, cancelableArg: boolean, viewArg: Window, detailArg: number, relatedTargetArg: EventTarget): void;
}

declare var FocusEvent: {
    prototype: FocusEvent;
    new(typeArg: string, eventInitDict?: FocusEventInit): FocusEvent;
};

interface FocusNavigationEvent extends Event {
    readonly navigationReason: NavigationReason;
    readonly originHeight: number;
    readonly originLeft: number;
    readonly originTop: number;
    readonly originWidth: number;
    requestFocus(): void;
}

declare var FocusNavigationEvent: {
    prototype: FocusNavigationEvent;
    new(type: string, eventInitDict?: FocusNavigationEventInit): FocusNavigationEvent;
};

interface FormData {
    append(name: string, value: string | Blob, fileName?: string): void;
    delete(name: string): void;
    get(name: string): FormDataEntryValue | null;
    getAll(name: string): FormDataEntryValue[];
    has(name: string): boolean;
    set(name: string, value: string | Blob, fileName?: string): void;
}

declare var FormData: {
    prototype: FormData;
    new(): FormData;
    new(form: HTMLFormElement): FormData;
};

interface GainNode extends AudioNode {
    readonly gain: AudioParam;
}

declare var GainNode: {
    prototype: GainNode;
    new(): GainNode;
};

interface Gamepad {
    readonly axes: number[];
    readonly buttons: GamepadButton[];
    readonly connected: boolean;
    readonly displayId: number;
    readonly hand: GamepadHand;
    readonly hapticActuators: GamepadHapticActuator[];
    readonly id: string;
    readonly index: number;
    readonly mapping: GamepadMappingType;
    readonly pose: GamepadPose | null;
    readonly timestamp: number;
}

declare var Gamepad: {
    prototype: Gamepad;
    new(): Gamepad;
};

interface GamepadButton {
    readonly pressed: boolean;
    readonly touched: boolean;
    readonly value: number;
}

declare var GamepadButton: {
    prototype: GamepadButton;
    new(): GamepadButton;
};

interface GamepadEvent extends Event {
    readonly gamepad: Gamepad;
}

declare var GamepadEvent: {
    prototype: GamepadEvent;
    new(typeArg: string, eventInitDict?: GamepadEventInit): GamepadEvent;
};

interface GamepadHapticActuator {
    readonly type: GamepadHapticActuatorType;
    pulse(value: number, duration: number): Promise<boolean>;
}

declare var GamepadHapticActuator: {
    prototype: GamepadHapticActuator;
    new(): GamepadHapticActuator;
};

interface GamepadPose {
    readonly angularAcceleration: Float32Array | null;
    readonly angularVelocity: Float32Array | null;
    readonly hasOrientation: boolean;
    readonly hasPosition: boolean;
    readonly linearAcceleration: Float32Array | null;
    readonly linearVelocity: Float32Array | null;
    readonly orientation: Float32Array | null;
    readonly position: Float32Array | null;
}

declare var GamepadPose: {
    prototype: GamepadPose;
    new(): GamepadPose;
};

interface Geolocation {
    clearWatch(watchId: number): void;
    getCurrentPosition(successCallback: PositionCallback, errorCallback?: PositionErrorCallback, options?: PositionOptions): void;
    watchPosition(successCallback: PositionCallback, errorCallback?: PositionErrorCallback, options?: PositionOptions): number;
}

declare var Geolocation: {
    prototype: Geolocation;
    new(): Geolocation;
};

interface GetSVGDocument /*! @ooml-interface */ {
    getSVGDocument(): Document;
}

interface GlobalEventHandlersEventType {
    "pointercancel": PointerEvent;
    "pointerdown": PointerEvent;
    "pointerenter": PointerEvent;
    "pointerleave": PointerEvent;
    "pointermove": PointerEvent;
    "pointerout": PointerEvent;
    "pointerover": PointerEvent;
    "pointerup": PointerEvent;
    "wheel": WheelEvent;
}

interface GlobalEventHandlers /*! @ooml-interface */ {
    /*! @ooml-mapto(addEventListener) */ addGlobalEventHandlersEventListener<T extends GlobalEventHandlersEventType>(type: __Class<T>, listener: EventListener<GlobalEventHandlers, T>, options?: boolean | AddEventListenerOptions): void;
    /*! @ooml-mapto(removeEventListener) */ removeGlobalEventHandlersEventListener<T extends GlobalEventHandlersEventType>(type: __Class<T>, listener: EventListener<GlobalEventHandlers, T>, options?: boolean | EventListenerOptions): void;
}

interface HTMLAllCollection {
    readonly length: number;
    item(nameOrIndex?: string): HTMLCollection | Element | null;
    namedItem(name: string): HTMLCollection | Element | null;
    [index: number]: Element;
}

declare var HTMLAllCollection: {
    prototype: HTMLAllCollection;
    new(): HTMLAllCollection;
};

interface HTMLAnchorElement extends HTMLHyperlinkElement {
    Methods: string;
    /**
     * Sets or retrieves the character set used to encode the object.
     */
    /** @deprecated */
    charset: string;
    /**
     * Sets or retrieves the coordinates of the object.
     */
    /** @deprecated */
    coords: string;
    download: string;
    /**
     * Sets or retrieves the language code of the object.
     */
    hreflang: string;
    readonly mimeType: string;
    /**
     * Sets or retrieves the shape of the object.
     */
    /** @deprecated */
    name: string;
    readonly nameProp: string;
    readonly protocolLong: string;
    /**
     * Sets or retrieves the relationship between the object and the destination of the link.
     */
    rel: string;
    /**
     * Sets or retrieves the relationship between the object and the destination of the link.
     */
    /** @deprecated */
    rev: string;
    /**
     * Sets or retrieves the shape of the object.
     */
    /** @deprecated */
    shape: string;
    /**
     * Sets or retrieves the window or frame at which to target content.
     */
    target: string;
    /**
     * Retrieves or sets the text of the object as a string.
     */
    text: string;
    type: string;
    urn: string;
}

declare var HTMLAnchorElement: {
    prototype: HTMLAnchorElement;
    new(): HTMLAnchorElement;
};

interface HTMLAppletElement extends HTMLElement {
    /** @deprecated */
    align: string;
    /**
     * Sets or retrieves a text alternative to the graphic.
     */
    /** @deprecated */
    alt: string;
    /**
     * Sets or retrieves a character string that can be used to implement your own archive functionality for the object.
     */
    /** @deprecated */
    archive: string;
    /** @deprecated */
    code: string;
    /**
     * Sets or retrieves the URL of the component.
     */
    /** @deprecated */
    codeBase: string;
    readonly form: HTMLFormElement | null;
    /**
     * Sets or retrieves the height of the object.
     */
    /** @deprecated */
    height: string;
    /** @deprecated */
    hspace: number;
    /**
     * Sets or retrieves the shape of the object.
     */
    /** @deprecated */
    name: string;
    /** @deprecated */
    object: string;
    /** @deprecated */
    vspace: number;
    /** @deprecated */
    width: string;
}

declare var HTMLAppletElement: {
    prototype: HTMLAppletElement;
    new(): HTMLAppletElement;
};

interface HTMLAreaElement extends HTMLHyperlinkElement {
    /**
     * Sets or retrieves a text alternative to the graphic.
     */
    alt: string;
    /**
     * Sets or retrieves the coordinates of the object.
     */
    coords: string;
    download: string;
    /**
     * Sets or gets whether clicks in this region cause action.
     */
    /** @deprecated */
    noHref: boolean;
    rel: string;
    /**
     * Sets or retrieves the shape of the object.
     */
    shape: string;
    /**
     * Sets or retrieves the window or frame at which to target content.
     */
    target: string;
}

declare var HTMLAreaElement: {
    prototype: HTMLAreaElement;
    new(): HTMLAreaElement;
};

interface HTMLAudioElement extends HTMLMediaElement {
    /*! @ooml-mapto(addEventListener) */ addHTMLAudioElementEventListener<T extends HTMLMediaElementEventType>(type: __Class<T>, listener: EventListener<HTMLAudioElement, T>, options?: boolean | AddEventListenerOptions): void;
    /*! @ooml-mapto(removeEventListener) */ removeHTMLAudioElementEventListener<T extends HTMLMediaElementEventType>(type: __Class<T>, listener: EventListener<HTMLAudioElement, T>, options?: boolean | EventListenerOptions): void;
}

declare var HTMLAudioElement: {
    prototype: HTMLAudioElement;
    new(): HTMLAudioElement;
};

interface HTMLBRElement extends HTMLElement {
    /**
     * Sets or retrieves the side on which floating objects are not to be positioned when any IHTMLBlockElement is inserted into the document.
     */
    /** @deprecated */
    clear: string;
}

declare var HTMLBRElement: {
    prototype: HTMLBRElement;
    new(): HTMLBRElement;
};

interface HTMLBaseElement extends HTMLElement {
    /**
     * Gets or sets the baseline URL on which relative links are based.
     */
    href: string;
    /**
     * Sets or retrieves the window or frame at which to target content.
     */
    target: string;
}

declare var HTMLBaseElement: {
    prototype: HTMLBaseElement;
    new(): HTMLBaseElement;
};

interface HTMLBaseFontElement extends HTMLElement {
    /**
     * Sets or retrieves the current typeface family.
     */
    /** @deprecated */
    face: string;
    /**
     * Sets or retrieves the font size of the object.
     */
    /** @deprecated */
    size: number;
}

declare var HTMLBaseFontElement: {
    prototype: HTMLBaseFontElement;
    new(): HTMLBaseFontElement;
};

interface HTMLBodyElementEventType extends HTMLElementEventType, WindowEventHandlersEventType {
    "blur": FocusEvent;
    "error": ErrorEvent;
    "focus": FocusEvent;
    "load": Event;
    "orientationchange": Event;
    "resize": UIEvent;
    "scroll": UIEvent;
}

interface HTMLBodyElement extends HTMLElement, WindowEventHandlers {
    /*! @ooml-mapto(addEventListener) */ addHTMLBodyElementEventListener<T extends HTMLBodyElementEventType>(type: __Class<T>, listener: EventListener<HTMLBodyElement, T>, options?: boolean | AddEventListenerOptions): void;
    /*! @ooml-mapto(removeEventListener) */ removeHTMLBodyElementEventListener<T extends HTMLBodyElementEventType>(type: __Class<T>, listener: EventListener<HTMLBodyElement, T>, options?: boolean | EventListenerOptions): void;
    /** @deprecated */
    aLink: string;
    /** @deprecated */
    background: string;
    /** @deprecated */
    bgColor: string;
    bgProperties: string;
    /** @deprecated */
    link: string;
    /** @deprecated */
    noWrap: boolean;
    /** @deprecated */
    text: string;
    /** @deprecated */
    vLink: string;
}

declare var HTMLBodyElement: {
    prototype: HTMLBodyElement;
    new(): HTMLBodyElement;
};

interface HTMLButtonElement extends HTMLElement {
    /**
     * Provides a way to direct a user to a specific field when a document loads. This can provide both direction and convenience for a user, reducing the need to click or tab to a field when a page opens. This attribute is true when present on an element, and false when missing.
     */
    autofocus: boolean;
    disabled: boolean;
    /**
     * Retrieves a reference to the form that the object is embedded in.
     */
    readonly form: HTMLFormElement | null;
    /**
     * Overrides the action attribute (where the data on a form is sent) on the parent form element.
     */
    formAction: string;
    /**
     * Used to override the encoding (formEnctype attribute) specified on the form element.
     */
    formEnctype: string;
    /**
     * Overrides the submit method attribute previously specified on a form element.
     */
    formMethod: string;
    /**
     * Overrides any validation or required attributes on a form or form elements to allow it to be submitted without validation. This can be used to create a "save draft"-type submit option.
     */
    formNoValidate: boolean;
    /**
     * Overrides the target attribute on a form element.
     */
    formTarget: string;
    /**
     * Sets or retrieves the name of the object.
     */
    name: string;
    status: any;
    /**
     * Gets the classification and default behavior of the button.
     */
    type: string;
    /**
     * Returns the error message that would be displayed if the user submits the form, or an empty string if no error message. It also triggers the standard error message, such as "this is a required field". The result is that the user sees validation messages without actually submitting.
     */
    readonly validationMessage: string;
    /**
     * Returns a  ValidityState object that represents the validity states of an element.
     */
    readonly validity: ValidityState;
    /**
     * Sets or retrieves the default or selected value of the control.
     */
    value: string;
    /**
     * Returns whether an element will successfully validate based on forms validation rules and constraints.
     */
    readonly willValidate: boolean;
    /**
     * Returns whether a form will validate when it is submitted, without having to submit it.
     */
    checkValidity(): boolean;
    /**
     * Sets a custom error message that is displayed when a form is submitted.
     * @param error Sets a custom error message that is displayed when a form is submitted.
     */
    setCustomValidity(error: string): void;
}

declare var HTMLButtonElement: {
    prototype: HTMLButtonElement;
    new(): HTMLButtonElement;
};

interface HTMLCanvasElement extends HTMLElement {
    /**
     * Gets or sets the height of a canvas element on a document.
     */
    height: number;
    /**
     * Gets or sets the width of a canvas element on a document.
     */
    width: number;
    /**
     * Returns an object that provides methods and properties for drawing and manipulating images and graphics on a canvas element in a document. A context object includes information about colors, line widths, fonts, and other graphic parameters that can be drawn on a canvas.
     * @param contextId The identifier (ID) of the type of canvas to create. Internet Explorer 9 and Internet Explorer 10 support only a 2-D context using canvas.getContext("2d"); IE11 Preview also supports 3-D or WebGL context using canvas.getContext("experimental-webgl");
     */
    getContext(contextId: "2d" | "webgl" | "experimental-webgl", contextAttributes?: Canvas2DContextAttributes | WebGLContextAttributes): CanvasRenderingContext2D | WebGLRenderingContext | null;
    /**
     * Returns a blob object encoded as a Portable Network Graphics (PNG) format from a canvas image or drawing.
     */
    msToBlob(): Blob;
    toBlob(callback: (result: Blob | null) => void, type?: string, ...arguments: any[]): void;
    /**
     * Returns the content of the current canvas as an image that you can use as a source for another canvas or an HTML element.
     * @param type The standard MIME type for the image format to return. If you do not specify this parameter, the default value is a PNG format image.
     */
    toDataURL(type?: string, ...args: any[]): string;
}

declare var HTMLCanvasElement: {
    prototype: HTMLCanvasElement;
    new(): HTMLCanvasElement;
};

interface HTMLCollectionBase {
    /**
     * Sets or retrieves the number of objects in a collection.
     */
    /**
     * Retrieves an object from various collections.
     */
}

interface HTMLCollection<T extends Element> {
  readonly length: number;
    /**
     * Retrieves a select object or an object from an options collection.
     */
    namedItem(name: string): T | null;
    item(index: number): T;
    [index: number]: T;
}

declare var HTMLCollection: {
    prototype: HTMLCollection;
    new(): HTMLCollection;
};

interface HTMLDListElement extends HTMLElement {
    /** @deprecated */
    compact: boolean;
}

declare var HTMLDListElement: {
    prototype: HTMLDListElement;
    new(): HTMLDListElement;
};

interface HTMLDataElement extends HTMLElement {
    value: string;
}

declare var HTMLDataElement: {
    prototype: HTMLDataElement;
    new(): HTMLDataElement;
};

interface HTMLDataListElement extends HTMLElement {
    readonly options: HTMLCollection<HTMLOptionElement>;
}

declare var HTMLDataListElement: {
    prototype: HTMLDataListElement;
    new(): HTMLDataListElement;
};

interface HTMLDetailsElement extends HTMLElement {
    open: boolean;
}

declare var HTMLDetailsElement: {
    prototype: HTMLDetailsElement;
    new(): HTMLDetailsElement;
};

interface HTMLDialogElement extends HTMLElement {
    open: boolean;
    returnValue: string;
    close(returnValue?: string): void;
    show(): void;
    showModal(): void;
}

declare var HTMLDialogElement: {
    prototype: HTMLDialogElement;
    new(): HTMLDialogElement;
};

interface HTMLDirectoryElement extends HTMLElement {
    compact: boolean;
}

declare var HTMLDirectoryElement: {
    prototype: HTMLDirectoryElement;
    new(): HTMLDirectoryElement;
};

interface HTMLDivElement extends HTMLElement {
    /**
     * Sets or retrieves how the object is aligned with adjacent text.
     */
    /** @deprecated */
    align: string;
    /**
     * Sets or retrieves whether the browser automatically performs wordwrap.
     */
    noWrap: boolean;
}

declare var HTMLDivElement: {
    prototype: HTMLDivElement;
    new(): HTMLDivElement;
};

interface HTMLDocument extends Document {
    /*! @ooml-mapto(addEventListener) */ addHTMLDocumentEventListener<T extends DocumentEventType>(type: __Class<T>, listener: EventListener<HTMLDocument, T>, options?: boolean | AddEventListenerOptions): void;
    /*! @ooml-mapto(removeEventListener) */ removeHTMLDocumentEventListener<T extends DocumentEventType>(type: __Class<T>, listener: EventListener<HTMLDocument, T>, options?: boolean | EventListenerOptions): void;
}

declare var HTMLDocument: {
    prototype: HTMLDocument;
    new(): HTMLDocument;
};

interface HTMLElementEventType extends ElementEventType {
    "abort": UIEvent;
    "activate": Event;
    "beforeactivate": Event;
    "beforecopy": Event;
    "beforecut": Event;
    "beforedeactivate": Event;
    "beforepaste": Event;
    "blur": FocusEvent;
    "canplay": Event;
    "canplaythrough": Event;
    "change": Event;
    "click": MouseEvent;
    "contextmenu": PointerEvent;
    "copy": ClipboardEvent;
    "cuechange": Event;
    "cut": ClipboardEvent;
    "dblclick": MouseEvent;
    "deactivate": Event;
    "drag": DragEvent;
    "dragend": DragEvent;
    "dragenter": DragEvent;
    "dragleave": DragEvent;
    "dragover": DragEvent;
    "dragstart": DragEvent;
    "drop": DragEvent;
    "durationchange": Event;
    "emptied": Event;
    "ended": Event;
    "error": ErrorEvent;
    "focus": FocusEvent;
    "input": Event;
    "invalid": Event;
    "keydown": KeyboardEvent;
    "keypress": KeyboardEvent;
    "keyup": KeyboardEvent;
    "load": Event;
    "loadeddata": Event;
    "loadedmetadata": Event;
    "loadstart": Event;
    "mousedown": MouseEvent;
    "mouseenter": MouseEvent;
    "mouseleave": MouseEvent;
    "mousemove": MouseEvent;
    "mouseout": MouseEvent;
    "mouseover": MouseEvent;
    "mouseup": MouseEvent;
    "mousewheel": WheelEvent;
    "MSContentZoom": Event;
    "MSManipulationStateChanged": Event;
    "paste": ClipboardEvent;
    "pause": Event;
    "play": Event;
    "playing": Event;
    "progress": ProgressEvent;
    "ratechange": Event;
    "reset": Event;
    "scroll": UIEvent;
    "seeked": Event;
    "seeking": Event;
    "select": UIEvent;
    "selectstart": Event;
    "stalled": Event;
    "submit": Event;
    "suspend": Event;
    "timeupdate": Event;
    "volumechange": Event;
    "waiting": Event;
}

interface HTMLElement extends Element, ElementCSSInlineStyle {
    /*! @ooml-mapto(addEventListener) */ addHTMLElementEventListener<T extends HTMLElementEventType>(type: __Class<T>, listener: EventListener<HTMLElement, T>, options?: boolean | AddEventListenerOptions): void;
    /*! @ooml-mapto(removeEventListener) */ removeHTMLElementEventListener<T extends HTMLElementEventType>(type: __Class<T>, listener: EventListener<HTMLElement, T>, options?: boolean | EventListenerOptions): void;
    accessKey: string;
    contentEditable: string;
    readonly dataset: DOMStringMap;
    dir: string;
    draggable: boolean;
    hidden: boolean;
    hideFocus: boolean;
    innerText: string;
    readonly isContentEditable: boolean;
    lang: string;
    readonly offsetHeight: number;
    readonly offsetLeft: number;
    readonly offsetParent: Element;
    readonly offsetTop: number;
    readonly offsetWidth: number;
    outerText: string;
    spellcheck: boolean;
    tabIndex: number;
    title: string;
    animate(keyframes: AnimationKeyFrame[], options: number | AnimationOptions): Animation;
    blur(): void;
    click(): void;
    dragDrop(): boolean;
    focus(): void;
    msGetInputContext(): MSInputMethodContext;
    closest<K extends HTMLElement>(selector: __Class<K>): K | null;
    getElementsByTagName<K extends HTMLElement>(name: __Class<K>): NodeList<K>;
}

declare var HTMLElement: {
    prototype: HTMLElement;
    new(): HTMLElement;
};

interface HTMLEmbedElement extends HTMLElement, GetSVGDocument {
    /**
     * Sets or retrieves the height of the object.
     */
    height: string;
    hidden: any;
    /**
     * Gets or sets whether the DLNA PlayTo device is available.
     */
    msPlayToDisabled: boolean;
    /**
     * Gets or sets the path to the preferred media source. This enables the Play To target device to stream the media content, which can be DRM protected, from a different location, such as a cloud media server.
     */
    msPlayToPreferredSourceUri: string;
    /**
     * Gets or sets the primary DLNA PlayTo device.
     */
    msPlayToPrimary: boolean;
    /**
     * Gets the source associated with the media element for use by the PlayToManager.
     */
    readonly msPlayToSource: any;
    /**
     * Sets or retrieves the name of the object.
     */
    /** @deprecated */
    name: string;
    /**
     * Retrieves the palette used for the embedded document.
     */
    readonly palette: string;
    /**
     * Retrieves the URL of the plug-in used to view an embedded document.
     */
    readonly pluginspage: string;
    readonly readyState: string;
    /**
     * Sets or retrieves a URL to be loaded by the object.
     */
    src: string;
    /**
     * Sets or retrieves the height and width units of the embed object.
     */
    units: string;
    /**
     * Sets or retrieves the width of the object.
     */
    width: string;
}

declare var HTMLEmbedElement: {
    prototype: HTMLEmbedElement;
    new(): HTMLEmbedElement;
};

interface HTMLFieldSetElement extends HTMLElement {
    /**
     * Sets or retrieves how the object is aligned with adjacent text.
     */
    align: string;
    disabled: boolean;
    /**
     * Retrieves a reference to the form that the object is embedded in.
     */
    readonly form: HTMLFormElement | null;
    name: string;
    /**
     * Returns the error message that would be displayed if the user submits the form, or an empty string if no error message. It also triggers the standard error message, such as "this is a required field". The result is that the user sees validation messages without actually submitting.
     */
    readonly validationMessage: string;
    /**
     * Returns a  ValidityState object that represents the validity states of an element.
     */
    readonly validity: ValidityState;
    /**
     * Returns whether an element will successfully validate based on forms validation rules and constraints.
     */
    readonly willValidate: boolean;
    /**
     * Returns whether a form will validate when it is submitted, without having to submit it.
     */
    checkValidity(): boolean;
    /**
     * Sets a custom error message that is displayed when a form is submitted.
     * @param error Sets a custom error message that is displayed when a form is submitted.
     */
    setCustomValidity(error: string): void;
}

declare var HTMLFieldSetElement: {
    prototype: HTMLFieldSetElement;
    new(): HTMLFieldSetElement;
};

interface HTMLFontElement extends HTMLElement {
    /**
     * Sets or retrieves the current typeface family.
     */
    /** @deprecated */
    face: string;
}

declare var HTMLFontElement: {
    prototype: HTMLFontElement;
    new(): HTMLFontElement;
};

interface HTMLFormControlsCollection extends HTMLCollectionBase {
    namedItem(name: string): HTMLCollection | Element | null;
}

declare var HTMLFormControlsCollection: {
    prototype: HTMLFormControlsCollection;
    new(): HTMLFormControlsCollection;
};

interface HTMLFormElement extends HTMLElement {
    /**
     * Sets or retrieves a list of character encodings for input data that must be accepted by the server processing the form.
     */
    acceptCharset: string;
    /**
     * Sets or retrieves the URL to which the form content is sent for processing.
     */
    action: string;
    /**
     * Specifies whether autocomplete is applied to an editable text field.
     */
    autocomplete: string;
    /**
     * Retrieves a collection, in source order, of all controls in a given form.
     */
    readonly elements: HTMLFormControlsCollection;
    /**
     * Sets or retrieves the MIME encoding for the form.
     */
    encoding: string;
    /**
     * Sets or retrieves the encoding type for the form.
     */
    enctype: string;
    /**
     * Sets or retrieves the number of objects in a collection.
     */
    readonly length: number;
    /**
     * Sets or retrieves how to send the form data to the server.
     */
    method: string;
    /**
     * Sets or retrieves the name of the object.
     */
    name: string;
    /**
     * Designates a form that is not validated when submitted.
     */
    noValidate: boolean;
    /**
     * Sets or retrieves the window or frame at which to target content.
     */
    target: string;
    /**
     * Returns whether a form will validate when it is submitted, without having to submit it.
     */
    checkValidity(): boolean;
    /**
     * Retrieves a form object or an object from an elements collection.
     * @param name Variant of type Number or String that specifies the object or collection to retrieve. If this parameter is a Number, it is the zero-based index of the object. If this parameter is a string, all objects with matching name or id properties are retrieved, and a collection is returned if more than one match is made.
     * @param index Variant of type Number that specifies the zero-based index of the object to retrieve when a collection is returned.
     */
    item(name?: any, index?: any): any;
    /**
     * Retrieves a form object or an object from an elements collection.
     */
    namedItem(name: string): any;
    reportValidity(): boolean;
    /**
     * Fires when the user resets a form.
     */
    reset(): void;
    /**
     * Fires when a FORM is about to be submitted.
     */
    submit(): void;


    [name: string]: any;
}

declare var HTMLFormElement: {
    prototype: HTMLFormElement;
    new(): HTMLFormElement;
};

interface HTMLFrameElementEventType extends HTMLElementEventType {
    "load": Event;
}

interface HTMLFrameElement extends HTMLElement, GetSVGDocument {
    /*! @ooml-mapto(addEventListener) */ addHTMLFrameElementEventListener<T extends HTMLFrameElementEventType>(type: __Class<T>, listener: EventListener<HTMLFrameElement, T>, options?: boolean | AddEventListenerOptions): void;
    /*! @ooml-mapto(removeEventListener) */ removeHTMLFrameElementEventListener<T extends HTMLFrameElementEventType>(type: __Class<T>, listener: EventListener<HTMLFrameElement, T>, options?: boolean | EventListenerOptions): void;
    /**
     * Specifies the properties of a border drawn around an object.
     */
    border: string;
    /**
     * Sets or retrieves the border color of the object.
     */
    borderColor: any;
    /**
     * Retrieves the document object of the page or frame.
     */
    /** @deprecated */
    readonly contentDocument: Document | null;
    /**
     * Retrieves the object of the specified.
     */
    /** @deprecated */
    readonly contentWindow: Window | null;
    /**
     * Sets or retrieves whether to display a border for the frame.
     */
    /** @deprecated */
    frameBorder: string;
    /**
     * Sets or retrieves the amount of additional space between the frames.
     */
    frameSpacing: any;
    /**
     * Sets or retrieves the height of the object.
     */
    height: string | number;
    /**
     * Sets or retrieves a URI to a long description of the object.
     */
    /** @deprecated */
    longDesc: string;
    /**
     * Sets or retrieves the top and bottom margin heights before displaying the text in a frame.
     */
    /** @deprecated */
    marginHeight: string;
    /**
     * Sets or retrieves the left and right margin widths before displaying the text in a frame.
     */
    /** @deprecated */
    marginWidth: string;
    /**
     * Sets or retrieves the frame name.
     */
    /** @deprecated */
    name: string;
    /**
     * Sets or retrieves whether the user can resize the frame.
     */
    /** @deprecated */
    noResize: boolean;
    /**
     * Sets or retrieves whether the frame can be scrolled.
     */
    /** @deprecated */
    scrolling: string;
    /**
     * Sets or retrieves a URL to be loaded by the object.
     */
    /** @deprecated */
    src: string;
    /**
     * Sets or retrieves the width of the object.
     */
    width: string | number;
}

declare var HTMLFrameElement: {
    prototype: HTMLFrameElement;
    new(): HTMLFrameElement;
};

interface HTMLFrameSetElementEventType extends HTMLElementEventType, WindowEventHandlersEventType {
    "blur": FocusEvent;
    "error": ErrorEvent;
    "focus": FocusEvent;
    "load": Event;
    "orientationchange": Event;
    "resize": UIEvent;
    "scroll": UIEvent;
}

interface HTMLFrameSetElement extends HTMLElement, WindowEventHandlers {
    /*! @ooml-mapto(addEventListener) */ addHTMLFrameSetElementEventListener<T extends HTMLFrameSetElementEventType>(type: __Class<T>, listener: EventListener<HTMLFrameSetElement, T>, options?: boolean | AddEventListenerOptions): void;
    /*! @ooml-mapto(removeEventListener) */ removeHTMLFrameSetElementEventListener<T extends HTMLFrameSetElementEventType>(type: __Class<T>, listener: EventListener<HTMLFrameSetElement, T>, options?: boolean | EventListenerOptions): void;
    /**
     * Sets or retrieves the frame widths of the object.
     */
    /** @deprecated */
    cols: string;
    name: string;
    /**
     * Sets or retrieves the frame heights of the object.
     */
    /** @deprecated */
    rows: string;
}

declare var HTMLFrameSetElement: {
    prototype: HTMLFrameSetElement;
    new(): HTMLFrameSetElement;
};

interface HTMLHRElement extends HTMLElement {
    /**
     * Sets or retrieves how the object is aligned with adjacent text.
     */
    /** @deprecated */
    align: string;
    /**
     * Sets or retrieves whether the horizontal rule is drawn with 3-D shading.
     */
    /** @deprecated */
    noShade: boolean;
    /**
     * Sets or retrieves the width of the object.
     */
    /** @deprecated */
    width: string;
}

declare var HTMLHRElement: {
    prototype: HTMLHRElement;
    new(): HTMLHRElement;
};

interface HTMLHeadElement extends HTMLElement {
    /** @deprecated */
    profile: string;
}

declare var HTMLHeadElement: {
    prototype: HTMLHeadElement;
    new(): HTMLHeadElement;
};

interface HTMLHeadingElement extends HTMLElement {
    /**
     * Sets or retrieves a value that indicates the table alignment.
     */
    /** @deprecated */
    align: string;
}

declare var HTMLHeadingElement: {
    prototype: HTMLHeadingElement;
    new(): HTMLHeadingElement;
};

interface HTMLHtmlElement extends HTMLElement {
    /**
     * Sets or retrieves the DTD version that governs the current document.
     */
    /** @deprecated */
    version: string;
}

declare var HTMLHtmlElement: {
    prototype: HTMLHtmlElement;
    new(): HTMLHtmlElement;
};

interface HTMLHyperlinkElement extends HTMLElement {
    hash: string;
    host: string;
    hostname: string;
    href: string;
    origin: string;
    pathname: string;
    port: string;
    protocol: string;
    search: string;
}

interface HTMLIFrameElementEventType extends HTMLElementEventType {
    "load": Event;
}

interface HTMLIFrameElement extends HTMLElement, GetSVGDocument {
    /*! @ooml-mapto(addEventListener) */ addHTMLIFrameElementEventListener<T extends HTMLIFrameElementEventType>(type: __Class<T>, listener: EventListener<HTMLIFrameElement, T>, options?: boolean | AddEventListenerOptions): void;
    /*! @ooml-mapto(removeEventListener) */ removeHTMLIFrameElementEventListener<T extends HTMLIFrameElementEventType>(type: __Class<T>, listener: EventListener<HTMLIFrameElement, T>, options?: boolean | EventListenerOptions): void;
    /**
     * Sets or retrieves how the object is aligned with adjacent text.
     */
    /** @deprecated */
    align: string;
    allowFullscreen: boolean;
    allowPaymentRequest: boolean;
    /**
     * Retrieves the document object of the page or frame.
     */
    readonly contentDocument: Document | null;
    /**
     * Retrieves the object of the specified.
     */
    readonly contentWindow: Window | null;
    /**
     * Sets or retrieves whether to display a border for the frame.
     */
    /** @deprecated */
    frameBorder: string;
    /**
     * Sets or retrieves the height of the object.
     */
    height: string;
    /**
     * Sets or retrieves a URI to a long description of the object.
     */
    /** @deprecated */
    longDesc: string;
    /**
     * Sets or retrieves the top and bottom margin heights before displaying the text in a frame.
     */
    /** @deprecated */
    marginHeight: string;
    /**
     * Sets or retrieves the left and right margin widths before displaying the text in a frame.
     */
    /** @deprecated */
    marginWidth: string;
    /**
     * Sets or retrieves the frame name.
     */
    name: string;
    readonly sandbox: DOMTokenList;
    /**
     * Sets or retrieves whether the frame can be scrolled.
     */
    /** @deprecated */
    scrolling: string;
    /**
     * Sets or retrieves a URL to be loaded by the object.
     */
    src: string;
    /**
     * Sets or retrives the content of the page that is to contain.
     */
    srcdoc: string;
    /**
     * Sets or retrieves the width of the object.
     */
    width: string;
}

declare var HTMLIFrameElement: {
    prototype: HTMLIFrameElement;
    new(): HTMLIFrameElement;
};

interface HTMLImageElement extends HTMLElement {
    /**
     * Sets or retrieves how the object is aligned with adjacent text.
     */
    /** @deprecated */
    align: string;
    /**
     * Sets or retrieves a text alternative to the graphic.
     */
    alt: string;
    /**
     * Specifies the properties of a border drawn around an object.
     */
    /** @deprecated */
    border: string;
    /**
     * Retrieves whether the object is fully loaded.
     */
    readonly complete: boolean;
    crossOrigin: string | null;
    readonly currentSrc: string;
    decoding: "async" | "sync" | "auto";
    /**
     * Sets or retrieves the height of the object.
     */
    height: number;
    /**
     * Sets or retrieves the width of the border to draw around the object.
     */
    /** @deprecated */
    hspace: number;
    /**
     * Sets or retrieves whether the image is a server-side image map.
     */
    isMap: boolean;
    /**
     * Sets or retrieves a Uniform Resource Identifier (URI) to a long description of the object.
     */
    longDesc: string;
    /** @deprecated */
    lowsrc: string;
    /**
     * Gets or sets whether the DLNA PlayTo device is available.
     */
    msPlayToDisabled: boolean;
    msPlayToPreferredSourceUri: string;
    /**
     * Gets or sets the primary DLNA PlayTo device.
     */
    msPlayToPrimary: boolean;
    /**
     * Gets the source associated with the media element for use by the PlayToManager.
     */
    readonly msPlayToSource: any;
    /**
     * Sets or retrieves the name of the object.
     */
    /** @deprecated */
    name: string;
    /**
     * The original height of the image resource before sizing.
     */
    readonly naturalHeight: number;
    /**
     * The original width of the image resource before sizing.
     */
    readonly naturalWidth: number;
    sizes: string;
    /**
     * The address or URL of the a media resource that is to be considered.
     */
    src: string;
    srcset: string;
    /**
     * Sets or retrieves the URL, often with a bookmark extension (#name), to use as a client-side image map.
     */
    useMap: string;
    /**
     * Sets or retrieves the vertical margin for the object.
     */
    /** @deprecated */
    vspace: number;
    /**
     * Sets or retrieves the width of the object.
     */
    width: number;
    readonly x: number;
    readonly y: number;
    msGetAsCastingSource(): any;
}

declare var HTMLImageElement: {
    prototype: HTMLImageElement;
    new(): HTMLImageElement;
};

interface HTMLInputElement extends HTMLElement {
    /**
     * Sets or retrieves a comma-separated list of content types.
     */
    accept: string;
    /**
     * Sets or retrieves how the object is aligned with adjacent text.
     */
    /** @deprecated */
    align: string;
    /**
     * Sets or retrieves a text alternative to the graphic.
     */
    alt: string;
    /**
     * Specifies whether autocomplete is applied to an editable text field.
     */
    autocomplete: string;
    /**
     * Provides a way to direct a user to a specific field when a document loads. This can provide both direction and convenience for a user, reducing the need to click or tab to a field when a page opens. This attribute is true when present on an element, and false when missing.
     */
    autofocus: boolean;
    /**
     * Sets or retrieves the state of the check box or radio button.
     */
    checked: boolean;
    /**
     * Sets or retrieves the state of the check box or radio button.
     */
    defaultChecked: boolean;
    /**
     * Sets or retrieves the initial contents of the object.
     */
    defaultValue: string;
    disabled: boolean;
    /**
     * Returns a FileList object on a file type input object.
     */
    files: FileList | null;
    /**
     * Retrieves a reference to the form that the object is embedded in.
     */
    readonly form: HTMLFormElement | null;
    /**
     * Overrides the action attribute (where the data on a form is sent) on the parent form element.
     */
    formAction: string;
    /**
     * Used to override the encoding (formEnctype attribute) specified on the form element.
     */
    formEnctype: string;
    /**
     * Overrides the submit method attribute previously specified on a form element.
     */
    formMethod: string;
    /**
     * Overrides any validation or required attributes on a form or form elements to allow it to be submitted without validation. This can be used to create a "save draft"-type submit option.
     */
    formNoValidate: boolean;
    /**
     * Overrides the target attribute on a form element.
     */
    formTarget: string;
    /**
     * Sets or retrieves the height of the object.
     */
    height: number;
    indeterminate: boolean;
    /**
     * Specifies the ID of a pre-defined datalist of options for an input element.
     */
    readonly list: HTMLElement | null;
    /**
     * Defines the maximum acceptable value for an input element with type="number".When used with the min and step attributes, lets you control the range and increment (such as only even numbers) that the user can enter into an input field.
     */
    max: string;
    /**
     * Sets or retrieves the maximum number of characters that the user can enter in a text control.
     */
    maxLength: number;
    /**
     * Defines the minimum acceptable value for an input element with type="number". When used with the max and step attributes, lets you control the range and increment (such as even numbers only) that the user can enter into an input field.
     */
    min: string;
    minLength: number;
    /**
     * Sets or retrieves the Boolean value indicating whether multiple items can be selected from a list.
     */
    multiple: boolean;
    /**
     * Sets or retrieves the name of the object.
     */
    name: string;
    /**
     * Gets or sets a string containing a regular expression that the user's input must match.
     */
    pattern: string;
    /**
     * Gets or sets a text string that is displayed in an input field as a hint or prompt to users as the format or type of information they need to enter.The text appears in an input field until the user puts focus on the field.
     */
    placeholder: string;
    readOnly: boolean;
    /**
     * When present, marks an element that can't be submitted without a value.
     */
    required: boolean;
    selectionDirection: string | null;
    /**
     * Gets or sets the end position or offset of a text selection.
     */
    selectionEnd: number | null;
    /**
     * Gets or sets the starting position or offset of a text selection.
     */
    selectionStart: number | null;
    size: number;
    /**
     * The address or URL of the a media resource that is to be considered.
     */
    src: string;
    /**
     * Defines an increment or jump between values that you want to allow the user to enter. When used with the max and min attributes, lets you control the range and increment (for example, allow only even numbers) that the user can enter into an input field.
     */
    step: string;
    /**
     * Returns the content type of the object.
     */
    type: string;
    /**
     * Sets or retrieves the URL, often with a bookmark extension (#name), to use as a client-side image map.
     */
    /** @deprecated */
    useMap: string;
    /**
     * Returns the error message that would be displayed if the user submits the form, or an empty string if no error message. It also triggers the standard error message, such as "this is a required field". The result is that the user sees validation messages without actually submitting.
     */
    readonly validationMessage: string;
    /**
     * Returns a  ValidityState object that represents the validity states of an element.
     */
    readonly validity: ValidityState;
    /**
     * Returns the value of the data at the cursor's current position.
     */
    value: string;
    valueAsDate: any;
    /**
     * Returns the input field value as a number.
     */
    valueAsNumber: number;
    webkitdirectory: boolean;
    /**
     * Sets or retrieves the width of the object.
     */
    width: number;
    /**
     * Returns whether an element will successfully validate based on forms validation rules and constraints.
     */
    readonly willValidate: boolean;
    /**
     * Returns whether a form will validate when it is submitted, without having to submit it.
     */
    checkValidity(): boolean;
    /**
     * Makes the selection equal to the current object.
     */
    select(): void;
    /**
     * Sets a custom error message that is displayed when a form is submitted.
     * @param error Sets a custom error message that is displayed when a form is submitted.
     */
    setCustomValidity(error: string): void;
    /**
     * Sets the start and end positions of a selection in a text field.
     * @param start The offset into the text field for the start of the selection.
     * @param end The offset into the text field for the end of the selection.
     * @param direction The direction in which the selection is performed.
     */
    setSelectionRange(start: number, end: number, direction?: "forward" | "backward" | "none"): void;
    /**
     * Decrements a range input control's value by the value given by the Step attribute. If the optional parameter is used, it will decrement the input control's step value multiplied by the parameter's value.
     * @param n Value to decrement the value by.
     */
    stepDown(n?: number): void;
    /**
     * Increments a range input control's value by the value given by the Step attribute. If the optional parameter is used, will increment the input control's value by that value.
     * @param n Value to increment the value by.
     */
    stepUp(n?: number): void;
}

declare var HTMLInputElement: {
    prototype: HTMLInputElement;
    new(): HTMLInputElement;
};

interface HTMLLIElement extends HTMLElement {
    /** @deprecated */
    type: string;
    /**
     * Sets or retrieves the value of a list item.
     */
    value: number;
}

declare var HTMLLIElement: {
    prototype: HTMLLIElement;
    new(): HTMLLIElement;
};

interface HTMLLabelElement extends HTMLElement {
    readonly control: HTMLInputElement | null;
    /**
     * Retrieves a reference to the form that the object is embedded in.
     */
    readonly form: HTMLFormElement | null;
    /**
     * Sets or retrieves the object to which the given label object is assigned.
     */
    htmlFor: string;
}

declare var HTMLLabelElement: {
    prototype: HTMLLabelElement;
    new(): HTMLLabelElement;
};

interface HTMLLegendElement extends HTMLElement {
    /**
     * Retrieves a reference to the form that the object is embedded in.
     */
    /** @deprecated */
    align: string;
    /**
     * Retrieves a reference to the form that the object is embedded in.
     */
    readonly form: HTMLFormElement | null;
}

declare var HTMLLegendElement: {
    prototype: HTMLLegendElement;
    new(): HTMLLegendElement;
};

interface HTMLLinkElement extends HTMLElement, LinkStyle {
    /**
     * Sets or retrieves the character set used to encode the object.
     */
    /** @deprecated */
    charset: string;
    crossOrigin: string | null;
    /** @deprecated */
    disabled: boolean;
    /**
     * Sets or retrieves a destination URL or an anchor point.
     */
    href: string;
    /**
     * Sets or retrieves the language code of the object.
     */
    hreflang: string;
    import?: Document;
    integrity: string;
    /**
     * Sets or retrieves the media type.
     */
    media: string;
    /**
     * Sets or retrieves the relationship between the object and the destination of the link.
     */
    rel: string;
    /**
     * Sets or retrieves the relationship between the object and the destination of the link.
     */
    /** @deprecated */
    rev: string;
    /**
     * Sets or retrieves the window or frame at which to target content.
     */
    /** @deprecated */
    target: string;
    /**
     * Sets or retrieves the MIME type of the object.
     */
    type: string;
}

declare var HTMLLinkElement: {
    prototype: HTMLLinkElement;
    new(): HTMLLinkElement;
};

interface HTMLMainElement extends HTMLElement {

}

declare var HTMLMainElement: {
    prototype: HTMLMainElement;
    new(): HTMLMainElement;
};

interface HTMLMapElement extends HTMLElement {
    /**
     * Retrieves a collection of the area objects defined for the given map object.
     */
    readonly areas: HTMLCollection<HTMLAreaElement>;
    /**
     * Sets or retrieves the name of the object.
     */
    name: string;
}

declare var HTMLMapElement: {
    prototype: HTMLMapElement;
    new(): HTMLMapElement;
};

interface HTMLMarqueeElementEventType extends HTMLElementEventType {
    "bounce": Event;
    "finish": Event;
    "start": Event;
}

interface HTMLMarqueeElement extends HTMLElement {
    /*! @ooml-mapto(addEventListener) */ addHTMLMarqueeElementEventListener<T extends HTMLMarqueeElementEventType>(type: __Class<T>, listener: EventListener<HTMLMarqueeElement, T>, options?: boolean | AddEventListenerOptions): void;
    /*! @ooml-mapto(removeEventListener) */ removeHTMLMarqueeElementEventListener<T extends HTMLMarqueeElementEventType>(type: __Class<T>, listener: EventListener<HTMLMarqueeElement, T>, options?: boolean | EventListenerOptions): void;
    /** @deprecated */
    behavior: string;
    /** @deprecated */
    bgColor: string;
    /** @deprecated */
    direction: string;
    /** @deprecated */
    height: string;
    /** @deprecated */
    hspace: number;
    /** @deprecated */
    loop: number;
    /** @deprecated */
    scrollAmount: number;
    /** @deprecated */
    scrollDelay: number;
    /** @deprecated */
    trueSpeed: boolean;
    /** @deprecated */
    vspace: number;
    /** @deprecated */
    width: string;
    /** @deprecated */
    start(): void;
    /** @deprecated */
    stop(): void;
}

declare var HTMLMarqueeElement: {
    prototype: HTMLMarqueeElement;
    new(): HTMLMarqueeElement;
};

interface HTMLMediaElementEventType extends HTMLElementEventType {
    "encrypted": MediaEncryptedEvent;
    "msneedkey": Event;
}

interface HTMLMediaElement extends HTMLElement {
    /*! @ooml-mapto(addEventListener) */ addHTMLMediaElementEventListener<T extends HTMLMediaElementEventType>(type: __Class<T>, listener: EventListener<HTMLMediaElement, T>, options?: boolean | AddEventListenerOptions): void;
    /*! @ooml-mapto(removeEventListener) */ removeHTMLMediaElementEventListener<T extends HTMLMediaElementEventType>(type: __Class<T>, listener: EventListener<HTMLMediaElement, T>, options?: boolean | EventListenerOptions): void;
    /**
     * Returns an AudioTrackList object with the audio tracks for a given video element.
     */
    readonly audioTracks: AudioTrackList;
    /**
     * Gets or sets a value that indicates whether to start playing the media automatically.
     */
    autoplay: boolean;
    /**
     * Gets a collection of buffered time ranges.
     */
    readonly buffered: TimeRanges;
    /**
     * Gets or sets a flag that indicates whether the client provides a set of controls for the media (in case the developer does not include controls for the player).
     */
    controls: boolean;
    crossOrigin: string | null;
    /**
     * Gets the address or URL of the current media resource that is selected by IHTMLMediaElement.
     */
    readonly currentSrc: string;
    /**
     * Gets or sets the current playback position, in seconds.
     */
    currentTime: number;
    defaultMuted: boolean;
    /**
     * Gets or sets the default playback rate when the user is not using fast forward or reverse for a video or audio resource.
     */
    defaultPlaybackRate: number;
    /**
     * Returns the duration in seconds of the current media resource. A NaN value is returned if duration is not available, or Infinity if the media resource is streaming.
     */
    readonly duration: number;
    /**
     * Gets information about whether the playback has ended or not.
     */
    readonly ended: boolean;
    /**
     * Returns an object representing the current error state of the audio or video element.
     */
    readonly error: MediaError | null;
    /**
     * Gets or sets a flag to specify whether playback should restart after it completes.
     */
    loop: boolean;
    readonly mediaKeys: MediaKeys | null;
    /**
     * Specifies the purpose of the audio or video media, such as background audio or alerts.
     */
    msAudioCategory: string;
    /**
     * Specifies the output device id that the audio will be sent to.
     */
    msAudioDeviceType: string;
    readonly msGraphicsTrustStatus: MSGraphicsTrust;
    /**
     * Gets the MSMediaKeys object, which is used for decrypting media data, that is associated with this media element.
     */
    /** @deprecated */
    readonly msKeys: MSMediaKeys;
    /**
     * Gets or sets whether the DLNA PlayTo device is available.
     */
    msPlayToDisabled: boolean;
    /**
     * Gets or sets the path to the preferred media source. This enables the Play To target device to stream the media content, which can be DRM protected, from a different location, such as a cloud media server.
     */
    msPlayToPreferredSourceUri: string;
    /**
     * Gets or sets the primary DLNA PlayTo device.
     */
    msPlayToPrimary: boolean;
    /**
     * Gets the source associated with the media element for use by the PlayToManager.
     */
    readonly msPlayToSource: any;
    /**
     * Specifies whether or not to enable low-latency playback on the media element.
     */
    msRealTime: boolean;
    /**
     * Gets or sets a flag that indicates whether the audio (either audio or the audio track on video media) is muted.
     */
    muted: boolean;
    /**
     * Gets the current network activity for the element.
     */
    readonly networkState: number;
    /**
     * Gets a flag that specifies whether playback is paused.
     */
    readonly paused: boolean;
    /**
     * Gets or sets the current rate of speed for the media resource to play. This speed is expressed as a multiple of the normal speed of the media resource.
     */
    playbackRate: number;
    /**
     * Gets TimeRanges for the current media resource that has been played.
     */
    readonly played: TimeRanges;
    /**
     * Gets or sets the current playback position, in seconds.
     */
    preload: string;
    readonly readyState: number;
    /**
     * Returns a TimeRanges object that represents the ranges of the current media resource that can be seeked.
     */
    readonly seekable: TimeRanges;
    /**
     * Gets a flag that indicates whether the the client is currently moving to a new playback position in the media resource.
     */
    readonly seeking: boolean;
    /**
     * The address or URL of the a media resource that is to be considered.
     */
    src: string;
    srcObject: MediaStream | MediaSource | Blob | null;
    readonly textTracks: TextTrackList;
    readonly videoTracks: VideoTrackList;
    /**
     * Gets or sets the volume level for audio portions of the media element.
     */
    volume: number;
    addTextTrack(kind: TextTrackKind, label?: string, language?: string): TextTrack;
    /**
     * Returns a string that specifies whether the client can play a given media resource type.
     */
    canPlayType(type: string): CanPlayTypeResult;
    /**
     * Resets the audio or video object and loads a new media resource.
     */
    load(): void;
    /**
     * Clears all effects from the media pipeline.
     */
    msClearEffects(): void;
    msGetAsCastingSource(): any;
    /**
     * Inserts the specified audio effect into media pipeline.
     */
    msInsertAudioEffect(activatableClassId: string, effectRequired: boolean, config?: any): void;
    /** @deprecated */
    msSetMediaKeys(mediaKeys: MSMediaKeys): void;
    /**
     * Specifies the media protection manager for a given media pipeline.
     */
    msSetMediaProtectionManager(mediaProtectionManager?: any): void;
    /**
     * Pauses the current playback and sets paused to TRUE. This can be used to test whether the media is playing or paused. You can also use the pause or play events to tell whether the media is playing or not.
     */
    pause(): void;
    /**
     * Loads and starts playback of a media resource.
     */
    play(): Promise<void>;
    setMediaKeys(mediaKeys: MediaKeys | null): Promise<void>;
}

declare var HTMLMediaElement: {
    prototype: HTMLMediaElement;
    new(): HTMLMediaElement;
    readonly HAVE_CURRENT_DATA: number;
    readonly HAVE_ENOUGH_DATA: number;
    readonly HAVE_FUTURE_DATA: number;
    readonly HAVE_METADATA: number;
    readonly HAVE_NOTHING: number;
    readonly NETWORK_EMPTY: number;
    readonly NETWORK_IDLE: number;
    readonly NETWORK_LOADING: number;
    readonly NETWORK_NO_SOURCE: number;
};

interface HTMLMenuElement extends HTMLElement {
    /** @deprecated */
    compact: boolean;
    type: string;
}

declare var HTMLMenuElement: {
    prototype: HTMLMenuElement;
    new(): HTMLMenuElement;
};

interface HTMLMetaElement extends HTMLElement {
    /**
     * Sets or retrieves the character set used to encode the object.
     */
    /** @deprecated */
    charset: string;
    /**
     * Gets or sets meta-information to associate with httpEquiv or name.
     */
    content: string;
    /**
     * Gets or sets information used to bind the value of a content attribute of a meta element to an HTTP response header.
     */
    httpEquiv: string;
    /**
     * Sets or retrieves the value specified in the content attribute of the meta object.
     */
    name: string;
    /**
     * Sets or retrieves a scheme to be used in interpreting the value of a property specified for the object.
     */
    /** @deprecated */
    scheme: string;
    /**
     * Sets or retrieves the URL property that will be loaded after the specified time has elapsed.
     */
    /** @deprecated */
    url: string;
}

declare var HTMLMetaElement: {
    prototype: HTMLMetaElement;
    new(): HTMLMetaElement;
};

interface HTMLMeterElement extends HTMLElement {
    high: number;
    low: number;
    max: number;
    min: number;
    optimum: number;
    value: number;
}

declare var HTMLMeterElement: {
    prototype: HTMLMeterElement;
    new(): HTMLMeterElement;
};

interface HTMLModElement extends HTMLElement {
    /**
     * Sets or retrieves reference information about the object.
     */
    cite: string;
    /**
     * Sets or retrieves the date and time of a modification to the object.
     */
    dateTime: string;
}

declare var HTMLModElement: {
    prototype: HTMLModElement;
    new(): HTMLModElement;
};

interface HTMLOListElement extends HTMLElement {
    /** @deprecated */
    compact: boolean;
    /**
     * The starting number.
     */
    start: number;
    type: string;
}

declare var HTMLOListElement: {
    prototype: HTMLOListElement;
    new(): HTMLOListElement;
};

interface HTMLObjectElement extends HTMLElement, GetSVGDocument {
    /**
     * Retrieves a string of the URL where the object tag can be found. This is often the href of the document that the object is in, or the value set by a base element.
     */
    readonly BaseHref: string;
    /** @deprecated */
    align: string;
    /**
     * Sets or retrieves a character string that can be used to implement your own archive functionality for the object.
     */
    /** @deprecated */
    archive: string;
    /** @deprecated */
    border: string;
    /**
     * Sets or retrieves the URL of the file containing the compiled Java class.
     */
    /** @deprecated */
    code: string;
    /**
     * Sets or retrieves the URL of the component.
     */
    /** @deprecated */
    codeBase: string;
    /**
     * Sets or retrieves the Internet media type for the code associated with the object.
     */
    /** @deprecated */
    codeType: string;
    /**
     * Retrieves the document object of the page or frame.
     */
    readonly contentDocument: Document | null;
    /**
     * Sets or retrieves the URL that references the data of the object.
     */
    data: string;
    /** @deprecated */
    declare: boolean;
    /**
     * Retrieves a reference to the form that the object is embedded in.
     */
    readonly form: HTMLFormElement | null;
    /**
     * Sets or retrieves the height of the object.
     */
    height: string;
    /** @deprecated */
    hspace: number;
    /**
     * Gets or sets whether the DLNA PlayTo device is available.
     */
    msPlayToDisabled: boolean;
    /**
     * Gets or sets the path to the preferred media source. This enables the Play To target device to stream the media content, which can be DRM protected, from a different location, such as a cloud media server.
     */
    msPlayToPreferredSourceUri: string;
    /**
     * Gets or sets the primary DLNA PlayTo device.
     */
    msPlayToPrimary: boolean;
    /**
     * Gets the source associated with the media element for use by the PlayToManager.
     */
    readonly msPlayToSource: any;
    /**
     * Sets or retrieves the name of the object.
     */
    name: string;
    readonly readyState: number;
    /**
     * Sets or retrieves a message to be displayed while an object is loading.
     */
    /** @deprecated */
    standby: string;
    /**
     * Sets or retrieves the MIME type of the object.
     */
    type: string;
    typemustmatch: boolean;
    /**
     * Sets or retrieves the URL, often with a bookmark extension (#name), to use as a client-side image map.
     */
    useMap: string;
    /**
     * Returns the error message that would be displayed if the user submits the form, or an empty string if no error message. It also triggers the standard error message, such as "this is a required field". The result is that the user sees validation messages without actually submitting.
     */
    readonly validationMessage: string;
    /**
     * Returns a  ValidityState object that represents the validity states of an element.
     */
    readonly validity: ValidityState;
    /** @deprecated */
    vspace: number;
    /**
     * Sets or retrieves the width of the object.
     */
    width: string;
    /**
     * Returns whether an element will successfully validate based on forms validation rules and constraints.
     */
    readonly willValidate: boolean;
    /**
     * Returns whether a form will validate when it is submitted, without having to submit it.
     */
    checkValidity(): boolean;
    /**
     * Sets a custom error message that is displayed when a form is submitted.
     * @param error Sets a custom error message that is displayed when a form is submitted.
     */
    setCustomValidity(error: string): void;
}

declare var HTMLObjectElement: {
    prototype: HTMLObjectElement;
    new(): HTMLObjectElement;
};

interface HTMLOptGroupElement extends HTMLElement {
    disabled: boolean;
    /**
     * Retrieves a reference to the form that the object is embedded in.
     */
    readonly form: HTMLFormElement | null;
    /**
     * Sets or retrieves a value that you can use to implement your own label functionality for the object.
     */
    label: string;
}

declare var HTMLOptGroupElement: {
    prototype: HTMLOptGroupElement;
    new(): HTMLOptGroupElement;
};

interface HTMLOptionElement extends HTMLElement {
    /**
     * Sets or retrieves the status of an option.
     */
    defaultSelected: boolean;
    disabled: boolean;
    /**
     * Retrieves a reference to the form that the object is embedded in.
     */
    readonly form: HTMLFormElement | null;
    /**
     * Sets or retrieves the ordinal position of an option in a list box.
     */
    readonly index: number;
    /**
     * Sets or retrieves a value that you can use to implement your own label functionality for the object.
     */
    label: string;
    /**
     * Sets or retrieves whether the option in the list box is the default item.
     */
    selected: boolean;
    /**
     * Sets or retrieves the text string specified by the option tag.
     */
    text: string;
    /**
     * Sets or retrieves the value which is returned to the server when the form control is submitted.
     */
    value: string;
}

declare var HTMLOptionElement: {
    prototype: HTMLOptionElement;
    new(): HTMLOptionElement;
};

interface HTMLOptionsCollection extends HTMLCollection<HTMLOptionElement> {
    length: number;
    selectedIndex: number;
    add(element: HTMLOptionElement | HTMLOptGroupElement, before?: HTMLElement | number | null): void;
    remove(index: number): void;
}

declare var HTMLOptionsCollection: {
    prototype: HTMLOptionsCollection;
    new(): HTMLOptionsCollection;
};

interface HTMLOutputElement extends HTMLElement {
    defaultValue: string;
    readonly form: HTMLFormElement | null;
    readonly htmlFor: DOMTokenList;
    name: string;
    readonly type: string;
    readonly validationMessage: string;
    readonly validity: ValidityState;
    value: string;
    readonly willValidate: boolean;
    checkValidity(): boolean;
    reportValidity(): boolean;
    setCustomValidity(error: string): void;
}

declare var HTMLOutputElement: {
    prototype: HTMLOutputElement;
    new(): HTMLOutputElement;
};

interface HTMLParagraphElement extends HTMLElement {
    /**
     * Sets or retrieves how the object is aligned with adjacent text.
     */
    /** @deprecated */
    align: string;
    clear: string;
}

declare var HTMLParagraphElement: {
    prototype: HTMLParagraphElement;
    new(): HTMLParagraphElement;
};

interface HTMLParamElement extends HTMLElement {
    /**
     * Sets or retrieves the name of an input parameter for an element.
     */
    name: string;
    /**
     * Sets or retrieves the content type of the resource designated by the value attribute.
     */
    /** @deprecated */
    type: string;
    /**
     * Sets or retrieves the value of an input parameter for an element.
     */
    value: string;
    /**
     * Sets or retrieves the data type of the value attribute.
     */
    /** @deprecated */
    valueType: string;
}

declare var HTMLParamElement: {
    prototype: HTMLParamElement;
    new(): HTMLParamElement;
};

interface HTMLPictureElement extends HTMLElement {

}

declare var HTMLPictureElement: {
    prototype: HTMLPictureElement;
    new(): HTMLPictureElement;
};

interface HTMLPreElement extends HTMLElement {
    /**
     * Sets or gets a value that you can use to implement your own width functionality for the object.
     */
    /** @deprecated */
    width: number;
}

declare var HTMLPreElement: {
    prototype: HTMLPreElement;
    new(): HTMLPreElement;
};

interface HTMLProgressElement extends HTMLElement {
    /**
     * Retrieves a reference to the form that the object is embedded in.
     */
    readonly form: HTMLFormElement | null;
    /**
     * Defines the maximum, or "done" value for a progress element.
     */
    max: number;
    /**
     * Returns the quotient of value/max when the value attribute is set (determinate progress bar), or -1 when the value attribute is missing (indeterminate progress bar).
     */
    readonly position: number;
    /**
     * Sets or gets the current value of a progress element. The value must be a non-negative number between 0 and the max value.
     */
    value: number;
}

declare var HTMLProgressElement: {
    prototype: HTMLProgressElement;
    new(): HTMLProgressElement;
};

interface HTMLQuoteElement extends HTMLElement {
    /**
     * Sets or retrieves reference information about the object.
     */
    cite: string;
}

declare var HTMLQuoteElement: {
    prototype: HTMLQuoteElement;
    new(): HTMLQuoteElement;
};

interface HTMLScriptElement extends HTMLElement {
    async: boolean;
    /**
     * Sets or retrieves the character set used to encode the object.
     */
    charset: string;
    crossOrigin: string | null;
    /**
     * Sets or retrieves the status of the script.
     */
    defer: boolean;
    /**
     * Sets or retrieves the event for which the script is written.
     */
    /** @deprecated */
    event: string;
    /**
     * Sets or retrieves the object that is bound to the event script.
     */
    /** @deprecated */
    htmlFor: string;
    integrity: string;
    noModule: boolean;
    /**
     * Retrieves the URL to an external file that contains the source code or data.
     */
    src: string;
    /**
     * Retrieves or sets the text of the object as a string.
     */
    text: string;
    /**
     * Sets or retrieves the MIME type for the associated scripting engine.
     */
    type: string;
}

declare var HTMLScriptElement: {
    prototype: HTMLScriptElement;
    new(): HTMLScriptElement;
};

interface HTMLSelectElement extends HTMLElement {
    /**
     * Provides a way to direct a user to a specific field when a document loads. This can provide both direction and convenience for a user, reducing the need to click or tab to a field when a page opens. This attribute is true when present on an element, and false when missing.
     */
    autofocus: boolean;
    disabled: boolean;
    /**
     * Retrieves a reference to the form that the object is embedded in.
     */
    readonly form: HTMLFormElement | null;
    /**
     * Sets or retrieves the number of objects in a collection.
     */
    length: number;
    /**
     * Sets or retrieves the Boolean value indicating whether multiple items can be selected from a list.
     */
    multiple: boolean;
    /**
     * Sets or retrieves the name of the object.
     */
    name: string;
    readonly options: HTMLOptionsCollection;
    /**
     * When present, marks an element that can't be submitted without a value.
     */
    required: boolean;
    /**
     * Sets or retrieves the index of the selected option in a select object.
     */
    selectedIndex: number;
    readonly selectedOptions: HTMLCollection<HTMLOptionElement>;
    /**
     * Sets or retrieves the number of rows in the list box.
     */
    size: number;
    /**
     * Retrieves the type of select control based on the value of the MULTIPLE attribute.
     */
    readonly type: string;
    /**
     * Returns the error message that would be displayed if the user submits the form, or an empty string if no error message. It also triggers the standard error message, such as "this is a required field". The result is that the user sees validation messages without actually submitting.
     */
    readonly validationMessage: string;
    /**
     * Returns a  ValidityState object that represents the validity states of an element.
     */
    readonly validity: ValidityState;
    /**
     * Sets or retrieves the value which is returned to the server when the form control is submitted.
     */
    value: string;
    /**
     * Returns whether an element will successfully validate based on forms validation rules and constraints.
     */
    readonly willValidate: boolean;
    /**
     * Adds an element to the areas, controlRange, or options collection.
     * @param element Variant of type Number that specifies the index position in the collection where the element is placed. If no value is given, the method places the element at the end of the collection.
     * @param before Variant of type Object that specifies an element to insert before, or null to append the object to the collection.
     */
    add(element: HTMLOptionElement | HTMLOptGroupElement, before?: HTMLElement | number | null): void;
    /**
     * Returns whether a form will validate when it is submitted, without having to submit it.
     */
    checkValidity(): boolean;
    /**
     * Retrieves a select object or an object from an options collection.
     * @param name Variant of type Number or String that specifies the object or collection to retrieve. If this parameter is an integer, it is the zero-based index of the object. If this parameter is a string, all objects with matching name or id properties are retrieved, and a collection is returned if more than one match is made.
     * @param index Variant of type Number that specifies the zero-based index of the object to retrieve when a collection is returned.
     */
    item(name?: any, index?: any): Element | null;
    /**
     * Retrieves a select object or an object from an options collection.
     * @param namedItem A String that specifies the name or id property of the object to retrieve. A collection is returned if more than one match is made.
     */
    namedItem(name: string): any;
    /**
     * Removes an element from the collection.
     * @param index Number that specifies the zero-based index of the element to remove from the collection.
     */
    remove(index?: number): void;
    /**
     * Sets a custom error message that is displayed when a form is submitted.
     * @param error Sets a custom error message that is displayed when a form is submitted.
     */
    setCustomValidity(error: string): void;


    [name: string]: any;
}

declare var HTMLSelectElement: {
    prototype: HTMLSelectElement;
    new(): HTMLSelectElement;
};

interface HTMLSlotElement extends HTMLElement {
    name: string;
    assignedNodes(options?: AssignedNodesOptions): Node[];
}

interface HTMLSourceElement extends HTMLElement {
    /**
     * Gets or sets the intended media type of the media source.
     */
    media: string;
    /** @deprecated */
    msKeySystem: string;
    sizes: string;
    /**
     * The address or URL of the a media resource that is to be considered.
     */
    src: string;
    srcset: string;
    /**
     * Gets or sets the MIME type of a media resource.
     */
    type: string;
}

declare var HTMLSourceElement: {
    prototype: HTMLSourceElement;
    new(): HTMLSourceElement;
};

interface HTMLSpanElement extends HTMLElement {

}

declare var HTMLSpanElement: {
    prototype: HTMLSpanElement;
    new(): HTMLSpanElement;
};

interface HTMLStyleElement extends HTMLElement, LinkStyle {
    /** @deprecated */
    disabled: boolean;
    /**
     * Sets or retrieves the media type.
     */
    media: string;
    /**
     * Retrieves the CSS language in which the style sheet is written.
     */
    type: string;
}

declare var HTMLStyleElement: {
    prototype: HTMLStyleElement;
    new(): HTMLStyleElement;
};

interface HTMLSummaryElement extends HTMLElement {

}

declare var HTMLSummaryElement: {
    prototype: HTMLSummaryElement;
    new(): HTMLSummaryElement;
};

interface HTMLTableCaptionElement extends HTMLElement {
    /**
     * Sets or retrieves the alignment of the caption or legend.
     */
    /** @deprecated */
    align: string;
}

declare var HTMLTableCaptionElement: {
    prototype: HTMLTableCaptionElement;
    new(): HTMLTableCaptionElement;
};

interface HTMLTableCellElement extends HTMLElement {
    /**
     * Sets or retrieves abbreviated text for the object.
     */
    abbr: string;
    /**
     * Sets or retrieves how the object is aligned with adjacent text.
     */
    /** @deprecated */
    align: string;
    /**
     * Sets or retrieves a comma-delimited list of conceptual categories associated with the object.
     */
    /** @deprecated */
    axis: string;
    /** @deprecated */
    bgColor: string;
    /**
     * Retrieves the position of the object in the cells collection of a row.
     */
    readonly cellIndex: number;
    /** @deprecated */
    ch: string;
    /** @deprecated */
    chOff: string;
    /**
     * Sets or retrieves the number columns in the table that the object should span.
     */
    colSpan: number;
    /**
     * Sets or retrieves a list of header cells that provide information for the object.
     */
    headers: string;
    /**
     * Sets or retrieves the height of the object.
     */
    /** @deprecated */
    height: string;
    /**
     * Sets or retrieves whether the browser automatically performs wordwrap.
     */
    /** @deprecated */
    noWrap: boolean;
    /**
     * Sets or retrieves how many rows in a table the cell should span.
     */
    rowSpan: number;
    /**
     * Sets or retrieves the group of cells in a table to which the object's information applies.
     */
    scope: string;
    /** @deprecated */
    vAlign: string;
    /**
     * Sets or retrieves the width of the object.
     */
    /** @deprecated */
    width: string;
}

declare var HTMLTableCellElement: {
    prototype: HTMLTableCellElement;
    new(): HTMLTableCellElement;
};

interface HTMLTableColElement extends HTMLElement {
    /**
     * Sets or retrieves the alignment of the object relative to the display or table.
     */
    /** @deprecated */
    align: string;
    /** @deprecated */
    ch: string;
    /** @deprecated */
    chOff: string;
    /**
     * Sets or retrieves the number of columns in the group.
     */
    span: number;
    /** @deprecated */
    vAlign: string;
    /**
     * Sets or retrieves the width of the object.
     */
    /** @deprecated */
    width: string;
}

declare var HTMLTableColElement: {
    prototype: HTMLTableColElement;
    new(): HTMLTableColElement;
};

interface HTMLTableDataCellElement extends HTMLTableCellElement {

}

declare var HTMLTableDataCellElement: {
    prototype: HTMLTableDataCellElement;
    new(): HTMLTableDataCellElement;
};

interface HTMLTableElement extends HTMLElement {
    /**
     * Sets or retrieves a value that indicates the table alignment.
     */
    /** @deprecated */
    align: string;
    /** @deprecated */
    bgColor: string;
    /**
     * Sets or retrieves the width of the border to draw around the object.
     */
    /** @deprecated */
    border: string;
    /**
     * Retrieves the caption object of a table.
     */
    caption: HTMLTableCaptionElement | null;
    /**
     * Sets or retrieves the amount of space between the border of the cell and the content of the cell.
     */
    /** @deprecated */
    cellPadding: string;
    /**
     * Sets or retrieves the amount of space between cells in a table.
     */
    /** @deprecated */
    cellSpacing: string;
    /**
     * Sets or retrieves the way the border frame around the table is displayed.
     */
    /** @deprecated */
    frame: string;
    /**
     * Sets or retrieves the number of horizontal rows contained in the object.
     */
    readonly rows: HTMLCollection<HTMLTableRowElement>;
    /**
     * Sets or retrieves which dividing lines (inner borders) are displayed.
     */
    /** @deprecated */
    rules: string;
    /**
     * Sets or retrieves a description and/or structure of the object.
     */
    /** @deprecated */
    summary: string;
    /**
     * Retrieves a collection of all tBody objects in the table. Objects in this collection are in source order.
     */
    readonly tBodies: HTMLCollection<HTMLTableSectionElement>;
    /**
     * Retrieves the tFoot object of the table.
     */
    tFoot: HTMLTableSectionElement | null;
    /**
     * Retrieves the tHead object of the table.
     */
    tHead: HTMLTableSectionElement | null;
    /**
     * Sets or retrieves the width of the object.
     */
    /** @deprecated */
    width: string;
    /**
     * Creates an empty caption element in the table.
     */
    createCaption(): HTMLTableCaptionElement;
    /**
     * Creates an empty tBody element in the table.
     */
    createTBody(): HTMLTableSectionElement;
    /**
     * Creates an empty tFoot element in the table.
     */
    createTFoot(): HTMLTableSectionElement;
    /**
     * Returns the tHead element object if successful, or null otherwise.
     */
    createTHead(): HTMLTableSectionElement;
    /**
     * Deletes the caption element and its contents from the table.
     */
    deleteCaption(): void;
    /**
     * Removes the specified row (tr) from the element and from the rows collection.
     * @param index Number that specifies the zero-based position in the rows collection of the row to remove.
     */
    deleteRow(index?: number): void;
    /**
     * Deletes the tFoot element and its contents from the table.
     */
    deleteTFoot(): void;
    /**
     * Deletes the tHead element and its contents from the table.
     */
    deleteTHead(): void;
    /**
     * Creates a new row (tr) in the table, and adds the row to the rows collection.
     * @param index Number that specifies where to insert the row in the rows collection. The default value is -1, which appends the new row to the end of the rows collection.
     */
    insertRow(index?: number): HTMLTableRowElement;
}

declare var HTMLTableElement: {
    prototype: HTMLTableElement;
    new(): HTMLTableElement;
};

interface HTMLTableHeaderCellElement extends HTMLTableCellElement {
    scope: string;
}

declare var HTMLTableHeaderCellElement: {
    prototype: HTMLTableHeaderCellElement;
    new(): HTMLTableHeaderCellElement;
};

interface HTMLTableRowElement extends HTMLElement {
    /**
     * Sets or retrieves how the object is aligned with adjacent text.
     */
    /** @deprecated */
    align: string;
    /** @deprecated */
    bgColor: string;
    /**
     * Retrieves a collection of all cells in the table row.
     */
    readonly cells: HTMLCollection<HTMLTableCellElement>;
    /** @deprecated */
    ch: string;
    /** @deprecated */
    chOff: string;
    /**
     * Retrieves the position of the object in the rows collection for the table.
     */
    readonly rowIndex: number;
    /**
     * Retrieves the position of the object in the collection.
     */
    readonly sectionRowIndex: number;
    /** @deprecated */
    vAlign: string;
    /**
     * Removes the specified cell from the table row, as well as from the cells collection.
     * @param index Number that specifies the zero-based position of the cell to remove from the table row. If no value is provided, the last cell in the cells collection is deleted.
     */
    deleteCell(index?: number): void;
    /**
     * Creates a new cell in the table row, and adds the cell to the cells collection.
     * @param index Number that specifies where to insert the cell in the tr. The default value is -1, which appends the new cell to the end of the cells collection.
     */
    insertCell(index?: number): HTMLTableDataCellElement;
}

declare var HTMLTableRowElement: {
    prototype: HTMLTableRowElement;
    new(): HTMLTableRowElement;
};

interface HTMLTableSectionElement extends HTMLElement {
    /**
     * Sets or retrieves a value that indicates the table alignment.
     */
    /** @deprecated */
    align: string;
    /** @deprecated */
    ch: string;
    /** @deprecated */
    chOff: string;
    /**
     * Sets or retrieves the number of horizontal rows contained in the object.
     */
    readonly rows: HTMLCollection<HTMLTableRowElement>;
    /** @deprecated */
    vAlign: string;
    /**
     * Removes the specified row (tr) from the element and from the rows collection.
     * @param index Number that specifies the zero-based position in the rows collection of the row to remove.
     */
    deleteRow(index?: number): void;
    /**
     * Creates a new row (tr) in the table, and adds the row to the rows collection.
     * @param index Number that specifies where to insert the row in the rows collection. The default value is -1, which appends the new row to the end of the rows collection.
     */
    insertRow(index?: number): HTMLTableRowElement;
}

declare var HTMLTableSectionElement: {
    prototype: HTMLTableSectionElement;
    new(): HTMLTableSectionElement;
};

interface HTMLTemplateElement extends HTMLElement {
    readonly content: DocumentFragment;
}

declare var HTMLTemplateElement: {
    prototype: HTMLTemplateElement;
    new(): HTMLTemplateElement;
};

interface HTMLTextAreaElement extends HTMLElement {
    /**
     * Provides a way to direct a user to a specific field when a document loads. This can provide both direction and convenience for a user, reducing the need to click or tab to a field when a page opens. This attribute is true when present on an element, and false when missing.
     */
    autofocus: boolean;
    /**
     * Sets or retrieves the width of the object.
     */
    cols: number;
    /**
     * Sets or retrieves the initial contents of the object.
     */
    defaultValue: string;
    disabled: boolean;
    /**
     * Retrieves a reference to the form that the object is embedded in.
     */
    readonly form: HTMLFormElement | null;
    /**
     * Sets or retrieves the maximum number of characters that the user can enter in a text control.
     */
    maxLength: number;
    minLength: number;
    /**
     * Sets or retrieves the name of the object.
     */
    name: string;
    /**
     * Gets or sets a text string that is displayed in an input field as a hint or prompt to users as the format or type of information they need to enter.The text appears in an input field until the user puts focus on the field.
     */
    placeholder: string;
    /**
     * Sets or retrieves the value indicated whether the content of the object is read-only.
     */
    readOnly: boolean;
    /**
     * When present, marks an element that can't be submitted without a value.
     */
    required: boolean;
    /**
     * Sets or retrieves the number of horizontal rows contained in the object.
     */
    rows: number;
    /**
     * Gets or sets the end position or offset of a text selection.
     */
    selectionEnd: number;
    /**
     * Gets or sets the starting position or offset of a text selection.
     */
    selectionStart: number;
    /**
     * Retrieves the type of control.
     */
    readonly type: string;
    /**
     * Returns the error message that would be displayed if the user submits the form, or an empty string if no error message. It also triggers the standard error message, such as "this is a required field". The result is that the user sees validation messages without actually submitting.
     */
    readonly validationMessage: string;
    /**
     * Returns a  ValidityState object that represents the validity states of an element.
     */
    readonly validity: ValidityState;
    /**
     * Retrieves or sets the text in the entry field of the textArea element.
     */
    value: string;
    /**
     * Returns whether an element will successfully validate based on forms validation rules and constraints.
     */
    readonly willValidate: boolean;
    /**
     * Sets or retrieves how to handle wordwrapping in the object.
     */
    wrap: string;
    /**
     * Returns whether a form will validate when it is submitted, without having to submit it.
     */
    checkValidity(): boolean;
    /**
     * Highlights the input area of a form element.
     */
    select(): void;
    /**
     * Sets a custom error message that is displayed when a form is submitted.
     * @param error Sets a custom error message that is displayed when a form is submitted.
     */
    setCustomValidity(error: string): void;
    /**
     * Sets the start and end positions of a selection in a text field.
     * @param start The offset into the text field for the start of the selection.
     * @param end The offset into the text field for the end of the selection.
     * @param direction The direction in which the selection is performed.
     */
    setSelectionRange(start: number, end: number, direction?: "forward" | "backward" | "none"): void;
}

declare var HTMLTextAreaElement: {
    prototype: HTMLTextAreaElement;
    new(): HTMLTextAreaElement;
};

interface HTMLTimeElement extends HTMLElement {
    dateTime: string;
}

declare var HTMLTimeElement: {
    prototype: HTMLTimeElement;
    new(): HTMLTimeElement;
};

interface HTMLTitleElement extends HTMLElement {
    /**
     * Retrieves or sets the text of the object as a string.
     */
    text: string;
}

declare var HTMLTitleElement: {
    prototype: HTMLTitleElement;
    new(): HTMLTitleElement;
};

interface HTMLTrackElement extends HTMLElement {
    default: boolean;
    kind: string;
    label: string;
    readonly readyState: number;
    src: string;
    srclang: string;
    readonly track: TextTrack;
}

declare var HTMLTrackElement: {
    prototype: HTMLTrackElement;
    new(): HTMLTrackElement;
    readonly ERROR: number;
    readonly LOADED: number;
    readonly LOADING: number;
    readonly NONE: number;
};

interface HTMLUListElement extends HTMLElement {
    /** @deprecated */
    compact: boolean;
    /** @deprecated */
    type: string;
}

declare var HTMLUListElement: {
    prototype: HTMLUListElement;
    new(): HTMLUListElement;
};

interface HTMLUnknownElement extends HTMLElement {

}

declare var HTMLUnknownElement: {
    prototype: HTMLUnknownElement;
    new(): HTMLUnknownElement;
};

interface HTMLVideoElementEventType extends HTMLMediaElementEventType {
    "MSVideoFormatChanged": Event;
    "MSVideoFrameStepCompleted": Event;
    "MSVideoOptimalLayoutChanged": Event;
}

interface HTMLVideoElement extends HTMLMediaElement {
    /*! @ooml-mapto(addEventListener) */ addHTMLVideoElementEventListener<T extends HTMLVideoElementEventType>(type: __Class<T>, listener: EventListener<HTMLVideoElement, T>, options?: boolean | AddEventListenerOptions): void;
    /*! @ooml-mapto(removeEventListener) */ removeHTMLVideoElementEventListener<T extends HTMLVideoElementEventType>(type: __Class<T>, listener: EventListener<HTMLVideoElement, T>, options?: boolean | EventListenerOptions): void;
    /**
     * Gets or sets the height of the video element.
     */
    height: number;
    msHorizontalMirror: boolean;
    readonly msIsLayoutOptimalForPlayback: boolean;
    readonly msIsStereo3D: boolean;
    msStereo3DPackingMode: string;
    msStereo3DRenderMode: string;
    msZoom: boolean;
    /**
     * Gets or sets a URL of an image to display, for example, like a movie poster. This can be a still frame from the video, or another image if no video data is available.
     */
    poster: string;
    /**
     * Gets the intrinsic height of a video in CSS pixels, or zero if the dimensions are not known.
     */
    readonly videoHeight: number;
    /**
     * Gets the intrinsic width of a video in CSS pixels, or zero if the dimensions are not known.
     */
    readonly videoWidth: number;
    readonly webkitDisplayingFullscreen: boolean;
    readonly webkitSupportsFullscreen: boolean;
    /**
     * Gets or sets the width of the video element.
     */
    width: number;
    getVideoPlaybackQuality(): VideoPlaybackQuality;
    msFrameStep(forward: boolean): void;
    msInsertVideoEffect(activatableClassId: string, effectRequired: boolean, config?: any): void;
    msSetVideoRectangle(left: number, top: number, right: number, bottom: number): void;
    webkitEnterFullScreen(): void;
    webkitEnterFullscreen(): void;
    webkitExitFullScreen(): void;
    webkitExitFullscreen(): void;
}

declare var HTMLVideoElement: {
    prototype: HTMLVideoElement;
    new(): HTMLVideoElement;
};

interface HTMLegendElement {
    readonly form: HTMLFormElement | null;
}

declare var HTMLegendElement: {
    prototype: HTMLegendElement;
    new(): HTMLegendElement;
};

interface HashChangeEvent extends Event {
    readonly newURL: string;
    readonly oldURL: string;
}

declare var HashChangeEvent: {
    prototype: HashChangeEvent;
    new(type: string, eventInitDict?: HashChangeEventInit): HashChangeEvent;
};

interface Headers {
    append(name: string, value: string): void;
    delete(name: string): void;
    forEach(callback: IterationConsumer<string, string, Headers>): void;
    get(name: string): string | null;
    has(name: string): boolean;
    set(name: string, value: string): void;
}

declare var Headers: {
    prototype: Headers;
    new(init?: HeadersInit): Headers;
};

interface History {
    readonly length: number;
    scrollRestoration: ScrollRestoration;
    readonly state: any;
    back(distance?: any): void;
    forward(distance?: any): void;
    go(delta?: any): void;
    pushState(data: any, title?: string, url?: string | null): void;
    replaceState(data: any, title?: string, url?: string | null): void;
}

declare var History: {
    prototype: History;
    new(): History;
};

interface HkdfCtrParams extends Algorithm {
    context: BufferSource;
    hash: AlgorithmIdentifier;
    label: BufferSource;
}

interface IDBArrayKey extends Array<IDBValidKey> {
}

interface IDBCursor {
    readonly direction: IDBCursorDirection;
    readonly key: IDBKeyRange | IDBValidKey;
    readonly primaryKey: any;
    readonly source: IDBObjectStore | IDBIndex;
    advance(count: number): void;
    continue(key?: IDBKeyRange | IDBValidKey): void;
    delete(): IDBRequest;
    update(value: any): IDBRequest;
}

declare var IDBCursor: {
    prototype: IDBCursor;
    new(): IDBCursor;
    readonly NEXT: string;
    readonly NEXT_NO_DUPLICATE: string;
    readonly PREV: string;
    readonly PREV_NO_DUPLICATE: string;
};

interface IDBCursorWithValue extends IDBCursor {
    readonly value: any;
}

declare var IDBCursorWithValue: {
    prototype: IDBCursorWithValue;
    new(): IDBCursorWithValue;
};

interface IDBDatabaseEventType {
    "abort": Event;
    "error": Event;
}

interface IDBDatabase extends EventTarget {
    /*! @ooml-mapto(addEventListener) */ addIDBDatabaseEventListener<T extends IDBDatabaseEventType>(type: __Class<T>, listener: EventListener<IDBDatabase, T>, options?: boolean | AddEventListenerOptions): void;
    /*! @ooml-mapto(removeEventListener) */ removeIDBDatabaseEventListener<T extends IDBDatabaseEventType>(type: __Class<T>, listener: EventListener<IDBDatabase, T>, options?: boolean | EventListenerOptions): void;
    readonly name: string;
    readonly objectStoreNames: DOMStringList;
    readonly version: number;
    close(): void;
    createObjectStore(name: string, optionalParameters?: IDBObjectStoreParameters): IDBObjectStore;
    deleteObjectStore(name: string): void;
    transaction(storeNames: string | string[], mode?: IDBTransactionMode): IDBTransaction;
}

declare var IDBDatabase: {
    prototype: IDBDatabase;
    new(): IDBDatabase;
};

interface IDBFactory {
    cmp(first: any, second: any): number;
    deleteDatabase(name: string): IDBOpenDBRequest;
    open(name: string, version?: number): IDBOpenDBRequest;
}

declare var IDBFactory: {
    prototype: IDBFactory;
    new(): IDBFactory;
};

interface IDBIndex {
    readonly keyPath: string | string[];
    multiEntry: boolean;
    readonly name: string;
    readonly objectStore: IDBObjectStore;
    readonly unique: boolean;
    count(key?: IDBKeyRange | IDBValidKey): IDBRequest;
    get(key: IDBKeyRange | IDBValidKey): IDBRequest;
    getKey(key: IDBKeyRange | IDBValidKey): IDBRequest;
    openCursor(range?: IDBKeyRange | IDBValidKey, direction?: IDBCursorDirection): IDBRequest;
    openKeyCursor(range?: IDBKeyRange | IDBValidKey, direction?: IDBCursorDirection): IDBRequest;
}

declare var IDBIndex: {
    prototype: IDBIndex;
    new(): IDBIndex;
};

interface IDBKeyRange {
    readonly lower: any;
    readonly lowerOpen: boolean;
    readonly upper: any;
    readonly upperOpen: boolean;
}

declare var IDBKeyRange: {
    prototype: IDBKeyRange;
    new(): IDBKeyRange;
    bound(lower: any, upper: any, lowerOpen?: boolean, upperOpen?: boolean): IDBKeyRange;
    lowerBound(lower: any, open?: boolean): IDBKeyRange;
    only(value: any): IDBKeyRange;
    upperBound(upper: any, open?: boolean): IDBKeyRange;
};

interface IDBObjectStore {
    autoIncrement: boolean;
    readonly indexNames: DOMStringList;
    readonly keyPath: string | string[] | null;
    readonly name: string;
    readonly transaction: IDBTransaction;
    add(value: any, key?: IDBKeyRange | IDBValidKey): IDBRequest;
    clear(): IDBRequest;
    count(key?: IDBKeyRange | IDBValidKey): IDBRequest;
    createIndex(name: string, keyPath: string | string[], optionalParameters?: IDBIndexParameters): IDBIndex;
    delete(key: IDBKeyRange | IDBValidKey): IDBRequest;
    deleteIndex(indexName: string): void;
    get(key: any): IDBRequest;
    index(name: string): IDBIndex;
    openCursor(range?: IDBKeyRange | IDBValidKey, direction?: IDBCursorDirection): IDBRequest;
    put(value: any, key?: IDBKeyRange | IDBValidKey): IDBRequest;
}

declare var IDBObjectStore: {
    prototype: IDBObjectStore;
    new(): IDBObjectStore;
};

interface IDBOpenDBRequestEventType extends IDBRequestEventType {
    "blocked": Event;
    "upgradeneeded": IDBVersionChangeEvent;
}

interface IDBOpenDBRequest extends IDBRequest {
    /*! @ooml-mapto(addEventListener) */ addIDBOpenDBRequestEventListener<T extends IDBOpenDBRequestEventType>(type: __Class<T>, listener: EventListener<IDBOpenDBRequest, T>, options?: boolean | AddEventListenerOptions): void;
    /*! @ooml-mapto(removeEventListener) */ removeIDBOpenDBRequestEventListener<T extends IDBOpenDBRequestEventType>(type: __Class<T>, listener: EventListener<IDBOpenDBRequest, T>, options?: boolean | EventListenerOptions): void;
}

declare var IDBOpenDBRequest: {
    prototype: IDBOpenDBRequest;
    new(): IDBOpenDBRequest;
};

interface IDBRequestEventType {
    "error": Event;
    "success": Event;
}

interface IDBRequest extends EventTarget {
    /*! @ooml-mapto(addEventListener) */ addIDBRequestEventListener<T extends IDBRequestEventType>(type: __Class<T>, listener: EventListener<IDBRequest, T>, options?: boolean | AddEventListenerOptions): void;
    /*! @ooml-mapto(removeEventListener) */ removeIDBRequestEventListener<T extends IDBRequestEventType>(type: __Class<T>, listener: EventListener<IDBRequest, T>, options?: boolean | EventListenerOptions): void;
    readonly error: DOMException;
    readonly readyState: IDBRequestReadyState;
    readonly result: any;
    readonly source: IDBObjectStore | IDBIndex | IDBCursor;
    readonly transaction: IDBTransaction;
}

declare var IDBRequest: {
    prototype: IDBRequest;
    new(): IDBRequest;
};

interface IDBTransactionEventType {
    "abort": Event;
    "complete": Event;
    "error": Event;
}

interface IDBTransaction extends EventTarget {
    /*! @ooml-mapto(addEventListener) */ addIDBTransactionEventListener<T extends IDBTransactionEventType>(type: __Class<T>, listener: EventListener<IDBTransaction, T>, options?: boolean | AddEventListenerOptions): void;
    /*! @ooml-mapto(removeEventListener) */ removeIDBTransactionEventListener<T extends IDBTransactionEventType>(type: __Class<T>, listener: EventListener<IDBTransaction, T>, options?: boolean | EventListenerOptions): void;
    readonly db: IDBDatabase;
    readonly error: DOMException;
    readonly mode: IDBTransactionMode;
    abort(): void;
    objectStore(name: string): IDBObjectStore;
}

declare var IDBTransaction: {
    prototype: IDBTransaction;
    new(): IDBTransaction;
    readonly READ_ONLY: string;
    readonly READ_WRITE: string;
    readonly VERSION_CHANGE: string;
};

interface IDBVersionChangeEvent extends Event {
    readonly newVersion: number | null;
    readonly oldVersion: number;
}

declare var IDBVersionChangeEvent: {
    prototype: IDBVersionChangeEvent;
    new(): IDBVersionChangeEvent;
};

interface IIRFilterNode extends AudioNode {
    getFrequencyResponse(frequencyHz: Float32Array, magResponse: Float32Array, phaseResponse: Float32Array): void;
}

declare var IIRFilterNode: {
    prototype: IIRFilterNode;
    new(): IIRFilterNode;
};

interface ImageBitmap {
    readonly height: number;
    readonly width: number;
    close(): void;
}

interface ImageBitmapOptions {
    colorSpaceConversion?: "none" | "default";
    imageOrientation?: "none" | "flipY";
    premultiplyAlpha?: "none" | "premultiply" | "default";
    resizeHeight?: number;
    resizeQuality?: "pixelated" | "low" | "medium" | "high";
    resizeWidth?: number;
}

interface ImageData {
    readonly data: Uint8ClampedArray;
    readonly height: number;
    readonly width: number;
}

declare var ImageData: {
    prototype: ImageData;
    new(width: number, height: number): ImageData;
    new(array: Uint8ClampedArray, width: number, height: number): ImageData;
};

interface IntersectionObserver {
    readonly root: Element | null;
    readonly rootMargin: string;
    readonly thresholds: number[];
    disconnect(): void;
    observe(target: Element): void;
    takeRecords(): IntersectionObserverEntry[];
    unobserve(target: Element): void;
}

declare var IntersectionObserver: {
    prototype: IntersectionObserver;
    new(callback: IntersectionObserverCallback, options?: IntersectionObserverInit): IntersectionObserver;
};

interface IntersectionObserverEntry {
    readonly boundingClientRect: ClientRect | DOMRect;
    readonly intersectionRatio: number;
    readonly intersectionRect: ClientRect | DOMRect;
    readonly isIntersecting: boolean;
    readonly rootBounds: ClientRect | DOMRect;
    readonly target: Element;
    readonly time: number;
}

declare var IntersectionObserverEntry: {
    prototype: IntersectionObserverEntry;
    new(intersectionObserverEntryInit: IntersectionObserverEntryInit): IntersectionObserverEntry;
};

interface KeyboardEvent extends UIEvent {
    readonly altKey: boolean;
    /** @deprecated */
    char: string;
    /** @deprecated */
    readonly charCode: number;
    readonly code: string;
    readonly ctrlKey: boolean;
    readonly key: string;
    /** @deprecated */
    readonly keyCode: number;
    readonly location: number;
    readonly metaKey: boolean;
    readonly repeat: boolean;
    readonly shiftKey: boolean;
    /** @deprecated */
    readonly which: number;
    getModifierState(keyArg: string): boolean;
    /** @deprecated */
    initKeyboardEvent(typeArg: string, canBubbleArg: boolean, cancelableArg: boolean, viewArg: Window, keyArg: string, locationArg: number, modifiersListArg: string, repeat: boolean, locale: string): void;
}

declare var KeyboardEvent: {
    prototype: KeyboardEvent;
    new(typeArg: string, eventInitDict?: KeyboardEventInit): KeyboardEvent;
    readonly DOM_KEY_LOCATION_JOYSTICK: number;
    readonly DOM_KEY_LOCATION_LEFT: number;
    readonly DOM_KEY_LOCATION_MOBILE: number;
    readonly DOM_KEY_LOCATION_NUMPAD: number;
    readonly DOM_KEY_LOCATION_RIGHT: number;
    readonly DOM_KEY_LOCATION_STANDARD: number;
};

interface LinkStyle /*! @ooml-interface */ {
    readonly sheet: StyleSheet | null;
}

interface ListeningStateChangedEvent extends Event {
    readonly label: string;
    readonly state: ListeningState;
}

declare var ListeningStateChangedEvent: {
    prototype: ListeningStateChangedEvent;
    new(): ListeningStateChangedEvent;
};

interface Location {
    hash: string;
    host: string;
    hostname: string;
    href: string;
    readonly origin: string;
    pathname: string;
    port: string;
    protocol: string;
    search: string;
    assign(url: string): void;
    reload(forcedReload?: boolean): void;
    replace(url: string): void;
}

declare var Location: {
    prototype: Location;
    new(): Location;
};

interface MSAssertion {
    readonly id: string;
    readonly type: MSCredentialType;
}

declare var MSAssertion: {
    prototype: MSAssertion;
    new(): MSAssertion;
};

interface MSBlobBuilder {
    append(data: any, endings?: string): void;
    getBlob(contentType?: string): Blob;
}

declare var MSBlobBuilder: {
    prototype: MSBlobBuilder;
    new(): MSBlobBuilder;
};

interface MSCredentials {
    getAssertion(challenge: string, filter?: MSCredentialFilter, params?: MSSignatureParameters): Promise<MSAssertion>;
    makeCredential(accountInfo: MSAccountInfo, params: MSCredentialParameters[], challenge?: string): Promise<MSAssertion>;
}

declare var MSCredentials: {
    prototype: MSCredentials;
    new(): MSCredentials;
};

interface MSDCCEvent extends Event {
    readonly maxFr: number;
    readonly maxFs: number;
}

declare var MSDCCEvent: {
    prototype: MSDCCEvent;
    new(type: string, eventInitDict: MSDCCEventInit): MSDCCEvent;
};

interface MSDSHEvent extends Event {
    readonly sources: number[];
    readonly timestamp: number;
}

declare var MSDSHEvent: {
    prototype: MSDSHEvent;
    new(type: string, eventInitDict: MSDSHEventInit): MSDSHEvent;
};

interface MSFIDOCredentialAssertion extends MSAssertion {
    readonly algorithm: AlgorithmIdentifier;
    readonly attestation: any;
    readonly publicKey: string;
    readonly transportHints: MSTransportType[];
}

declare var MSFIDOCredentialAssertion: {
    prototype: MSFIDOCredentialAssertion;
    new(): MSFIDOCredentialAssertion;
};

interface MSFIDOSignature {
    readonly authnrData: string;
    readonly clientData: string;
    readonly signature: string;
}

declare var MSFIDOSignature: {
    prototype: MSFIDOSignature;
    new(): MSFIDOSignature;
};

interface MSFIDOSignatureAssertion extends MSAssertion {
    readonly signature: MSFIDOSignature;
}

declare var MSFIDOSignatureAssertion: {
    prototype: MSFIDOSignatureAssertion;
    new(): MSFIDOSignatureAssertion;
};

interface MSGesture {
    target: Element;
    addPointer(pointerId: number): void;
    stop(): void;
}

declare var MSGesture: {
    prototype: MSGesture;
    new(): MSGesture;
};

interface MSGestureEvent extends UIEvent {
    readonly clientX: number;
    readonly clientY: number;
    readonly expansion: number;
    readonly gestureObject: any;
    readonly hwTimestamp: number;
    readonly offsetX: number;
    readonly offsetY: number;
    readonly rotation: number;
    readonly scale: number;
    readonly screenX: number;
    readonly screenY: number;
    readonly translationX: number;
    readonly translationY: number;
    readonly velocityAngular: number;
    readonly velocityExpansion: number;
    readonly velocityX: number;
    readonly velocityY: number;
    initGestureEvent(typeArg: string, canBubbleArg: boolean, cancelableArg: boolean, viewArg: Window, detailArg: number, screenXArg: number, screenYArg: number, clientXArg: number, clientYArg: number, offsetXArg: number, offsetYArg: number, translationXArg: number, translationYArg: number, scaleArg: number, expansionArg: number, rotationArg: number, velocityXArg: number, velocityYArg: number, velocityExpansionArg: number, velocityAngularArg: number, hwTimestampArg: number): void;
}

declare var MSGestureEvent: {
    prototype: MSGestureEvent;
    new(): MSGestureEvent;
    readonly MSGESTURE_FLAG_BEGIN: number;
    readonly MSGESTURE_FLAG_CANCEL: number;
    readonly MSGESTURE_FLAG_END: number;
    readonly MSGESTURE_FLAG_INERTIA: number;
    readonly MSGESTURE_FLAG_NONE: number;
};

interface MSGraphicsTrust {
    readonly constrictionActive: boolean;
    readonly status: string;
}

declare var MSGraphicsTrust: {
    prototype: MSGraphicsTrust;
    new(): MSGraphicsTrust;
};

interface MSInputMethodContextEventType {
    "MSCandidateWindowHide": Event;
    "MSCandidateWindowShow": Event;
    "MSCandidateWindowUpdate": Event;
}

interface MSInputMethodContext extends EventTarget {
    /*! @ooml-mapto(addEventListener) */ addMSInputMethodContextEventListener<T extends MSInputMethodContextEventType>(type: __Class<T>, listener: EventListener<MSInputMethodContext, T>, options?: boolean | AddEventListenerOptions): void;
    /*! @ooml-mapto(removeEventListener) */ removeMSInputMethodContextEventListener<T extends MSInputMethodContextEventType>(type: __Class<T>, listener: EventListener<MSInputMethodContext, T>, options?: boolean | EventListenerOptions): void;
    readonly compositionEndOffset: number;
    readonly compositionStartOffset: number;
    readonly target: HTMLElement;
    getCandidateWindowClientRect(): ClientRect;
    getCompositionAlternatives(): string[];
    hasComposition(): boolean;
    isCandidateWindowVisible(): boolean;
}

declare var MSInputMethodContext: {
    prototype: MSInputMethodContext;
    new(): MSInputMethodContext;
};

interface MSMediaKeyError {
    readonly code: number;
    readonly systemCode: number;
}

declare var MSMediaKeyError: {
    prototype: MSMediaKeyError;
    new(): MSMediaKeyError;
    readonly MS_MEDIA_KEYERR_CLIENT: number;
    readonly MS_MEDIA_KEYERR_DOMAIN: number;
    readonly MS_MEDIA_KEYERR_HARDWARECHANGE: number;
    readonly MS_MEDIA_KEYERR_OUTPUT: number;
    readonly MS_MEDIA_KEYERR_SERVICE: number;
    readonly MS_MEDIA_KEYERR_UNKNOWN: number;
};

interface MSMediaKeyMessageEvent extends Event {
    readonly destinationURL: string | null;
    readonly message: Uint8Array;
}

declare var MSMediaKeyMessageEvent: {
    prototype: MSMediaKeyMessageEvent;
    new(): MSMediaKeyMessageEvent;
};

interface MSMediaKeyNeededEvent extends Event {
    readonly initData: Uint8Array | null;
}

declare var MSMediaKeyNeededEvent: {
    prototype: MSMediaKeyNeededEvent;
    new(): MSMediaKeyNeededEvent;
};

interface MSMediaKeySession extends EventTarget {
    readonly error: MSMediaKeyError | null;
    readonly keySystem: string;
    readonly sessionId: string;
    close(): void;
    update(key: Uint8Array): void;
}

declare var MSMediaKeySession: {
    prototype: MSMediaKeySession;
    new(): MSMediaKeySession;
};

interface MSMediaKeys {
    readonly keySystem: string;
    createSession(type: string, initData: Uint8Array, cdmData?: Uint8Array | null): MSMediaKeySession;
}

declare var MSMediaKeys: {
    prototype: MSMediaKeys;
    new(keySystem: string): MSMediaKeys;
    isTypeSupported(keySystem: string, type?: string | null): boolean;
    isTypeSupportedWithFeatures(keySystem: string, type?: string | null): string;
};

interface MSPointerEvent extends MouseEvent {
    readonly currentPoint: any;
    readonly height: number;
    readonly hwTimestamp: number;
    readonly intermediatePoints: any;
    readonly isPrimary: boolean;
    readonly pointerId: number;
    readonly pointerType: any;
    readonly pressure: number;
    readonly rotation: number;
    readonly tiltX: number;
    readonly tiltY: number;
    readonly width: number;
    getCurrentPoint(element: Element): void;
    getIntermediatePoints(element: Element): void;
    initPointerEvent(typeArg: string, canBubbleArg: boolean, cancelableArg: boolean, viewArg: Window, detailArg: number, screenXArg: number, screenYArg: number, clientXArg: number, clientYArg: number, ctrlKeyArg: boolean, altKeyArg: boolean, shiftKeyArg: boolean, metaKeyArg: boolean, buttonArg: number, relatedTargetArg: EventTarget, offsetXArg: number, offsetYArg: number, widthArg: number, heightArg: number, pressure: number, rotation: number, tiltX: number, tiltY: number, pointerIdArg: number, pointerType: any, hwTimestampArg: number, isPrimary: boolean): void;
}

declare var MSPointerEvent: {
    prototype: MSPointerEvent;
    new(typeArg: string, eventInitDict?: PointerEventInit): MSPointerEvent;
};

interface MSStream {
    readonly type: string;
    msClose(): void;
    msDetachStream(): any;
}

declare var MSStream: {
    prototype: MSStream;
    new(): MSStream;
};

interface MSStreamReaderEventType {
    "abort": UIEvent;
    "error": ErrorEvent;
    "load": Event;
    "loadend": ProgressEvent;
    "loadstart": Event;
    "progress": ProgressEvent;
}

interface MSStreamReader extends EventTarget {
    /*! @ooml-mapto(addEventListener) */ addMSStreamReaderEventListener<T extends MSStreamReaderEventType>(type: __Class<T>, listener: EventListener<MSStreamReader, T>, options?: boolean | AddEventListenerOptions): void;
    /*! @ooml-mapto(removeEventListener) */ removeMSStreamReaderEventListener<T extends MSStreamReaderEventType>(type: __Class<T>, listener: EventListener<MSStreamReader, T>, options?: boolean | EventListenerOptions): void;
    readonly error: DOMError;
    readonly readyState: number;
    readonly result: any;
    abort(): void;
    readAsArrayBuffer(stream: MSStream, size?: number): void;
    readAsBinaryString(stream: MSStream, size?: number): void;
    readAsBlob(stream: MSStream, size?: number): void;
    readAsDataURL(stream: MSStream, size?: number): void;
    readAsText(stream: MSStream, encoding?: string, size?: number): void;
}

declare var MSStreamReader: {
    prototype: MSStreamReader;
    new(): MSStreamReader;
    readonly DONE: number;
    readonly EMPTY: number;
    readonly LOADING: number;
};

interface MediaDeviceInfo {
    readonly deviceId: string;
    readonly groupId: string;
    readonly kind: MediaDeviceKind;
    readonly label: string;
}

declare var MediaDeviceInfo: {
    prototype: MediaDeviceInfo;
    new(): MediaDeviceInfo;
};

interface MediaDevicesEventType {
    "devicechange": Event;
}

interface MediaDevices extends EventTarget {
    /*! @ooml-mapto(addEventListener) */ addMediaDevicesEventListener<T extends MediaDevicesEventType>(type: __Class<T>, listener: EventListener<MediaDevices, T>, options?: boolean | AddEventListenerOptions): void;
    /*! @ooml-mapto(removeEventListener) */ removeMediaDevicesEventListener<T extends MediaDevicesEventType>(type: __Class<T>, listener: EventListener<MediaDevices, T>, options?: boolean | EventListenerOptions): void;
    enumerateDevices(): Promise<MediaDeviceInfo[]>;
    getSupportedConstraints(): MediaTrackSupportedConstraints;
    getUserMedia(constraints: MediaStreamConstraints): Promise<MediaStream>;
}

declare var MediaDevices: {
    prototype: MediaDevices;
    new(): MediaDevices;
};

interface MediaElementAudioSourceNode extends AudioNode {
}

declare var MediaElementAudioSourceNode: {
    prototype: MediaElementAudioSourceNode;
    new(): MediaElementAudioSourceNode;
};

interface MediaEncryptedEvent extends Event {
    readonly initData: ArrayBuffer | null;
    readonly initDataType: string;
}

declare var MediaEncryptedEvent: {
    prototype: MediaEncryptedEvent;
    new(type: string, eventInitDict?: MediaEncryptedEventInit): MediaEncryptedEvent;
};

interface MediaError {
    readonly code: number;
    readonly message: string;
    readonly msExtendedCode: number;
}

declare var MediaError: {
    prototype: MediaError;
    new(): MediaError;
    readonly MEDIA_ERR_ABORTED: number;
    readonly MEDIA_ERR_DECODE: number;
    readonly MEDIA_ERR_NETWORK: number;
    readonly MEDIA_ERR_SRC_NOT_SUPPORTED: number;
    readonly MS_MEDIA_ERR_ENCRYPTED: number;
};

interface MediaKeyMessageEvent extends Event {
    readonly message: ArrayBuffer;
    readonly messageType: MediaKeyMessageType;
}

declare var MediaKeyMessageEvent: {
    prototype: MediaKeyMessageEvent;
    new(type: string, eventInitDict?: MediaKeyMessageEventInit): MediaKeyMessageEvent;
};

interface MediaKeySession extends EventTarget {
    readonly closed: Promise<void>;
    readonly expiration: number;
    readonly keyStatuses: MediaKeyStatusMap;
    readonly sessionId: string;
    close(): Promise<void>;
    generateRequest(initDataType: string, initData: BufferSource | null): Promise<void>;
    load(sessionId: string): Promise<boolean>;
    remove(): Promise<void>;
    update(response: BufferSource | null): Promise<void>;
}

declare var MediaKeySession: {
    prototype: MediaKeySession;
    new(): MediaKeySession;
};

interface MediaKeyStatusMap {
    readonly size: number;
    forEach(callback: IterationConsumer<BufferSource, MediaKeyStatus, MediaKeyStatusMap>): void;
    get(keyId: BufferSource | null): MediaKeyStatus;
    has(keyId: BufferSource | null): boolean;
}

declare var MediaKeyStatusMap: {
    prototype: MediaKeyStatusMap;
    new(): MediaKeyStatusMap;
};

interface MediaKeySystemAccess {
    readonly keySystem: string;
    createMediaKeys(): Promise<MediaKeys>;
    getConfiguration(): MediaKeySystemConfiguration;
}

declare var MediaKeySystemAccess: {
    prototype: MediaKeySystemAccess;
    new(): MediaKeySystemAccess;
};

interface MediaKeys {
    createSession(sessionType?: MediaKeySessionType): MediaKeySession;
    setServerCertificate(serverCertificate: BufferSource | null): Promise<void>;
}

declare var MediaKeys: {
    prototype: MediaKeys;
    new(): MediaKeys;
};

interface MediaList {
    readonly length: number;
    mediaText: string;
    appendMedium(medium: string): void;
    deleteMedium(medium: string): void;
    item(index: number): string | null;
    [index: number]: string;
}

declare var MediaList: {
    prototype: MediaList;
    new(): MediaList;
};

interface MediaQueryList {
    readonly matches: boolean;
    readonly media: string;
    addListener(listener: MediaQueryListListener): void;
    removeListener(listener: MediaQueryListListener): void;
}

declare var MediaQueryList: {
    prototype: MediaQueryList;
    new(): MediaQueryList;
};

interface MediaSource extends EventTarget {
    readonly activeSourceBuffers: SourceBufferList;
    duration: number;
    readonly readyState: string;
    readonly sourceBuffers: SourceBufferList;
    addSourceBuffer(type: string): SourceBuffer;
    endOfStream(error?: number): void;
    removeSourceBuffer(sourceBuffer: SourceBuffer): void;
}

declare var MediaSource: {
    prototype: MediaSource;
    new(): MediaSource;
    isTypeSupported(type: string): boolean;
};

interface MediaStreamEventType {
    "active": Event;
    "addtrack": MediaStreamTrackEvent;
    "inactive": Event;
    "removetrack": MediaStreamTrackEvent;
}

interface MediaStream extends EventTarget {
    /*! @ooml-mapto(addEventListener) */ addMediaStreamEventListener<T extends MediaStreamEventType>(type: __Class<T>, listener: EventListener<MediaStream, T>, options?: boolean | AddEventListenerOptions): void;
    /*! @ooml-mapto(removeEventListener) */ removeMediaStreamEventListener<T extends MediaStreamEventType>(type: __Class<T>, listener: EventListener<MediaStream, T>, options?: boolean | EventListenerOptions): void;
    readonly active: boolean;
    readonly id: string;
    addTrack(track: MediaStreamTrack): void;
    clone(): MediaStream;
    getAudioTracks(): MediaStreamTrack[];
    getTrackById(trackId: string): MediaStreamTrack | null;
    getTracks(): MediaStreamTrack[];
    getVideoTracks(): MediaStreamTrack[];
    removeTrack(track: MediaStreamTrack): void;
    stop(): void;
}

declare var MediaStream: {
    prototype: MediaStream;
    new(): MediaStream;
    new(stream: MediaStream): MediaStream;
    new(tracks: MediaStreamTrack[]): MediaStream;
};

interface MediaStreamAudioSourceNode extends AudioNode {
}

declare var MediaStreamAudioSourceNode: {
    prototype: MediaStreamAudioSourceNode;
    new(): MediaStreamAudioSourceNode;
};

interface MediaStreamError {
    readonly constraintName: string | null;
    readonly message: string | null;
    readonly name: string;
}

declare var MediaStreamError: {
    prototype: MediaStreamError;
    new(): MediaStreamError;
};

interface MediaStreamErrorEvent extends Event {
    readonly error: MediaStreamError | null;
}

declare var MediaStreamErrorEvent: {
    prototype: MediaStreamErrorEvent;
    new(typeArg: string, eventInitDict?: MediaStreamErrorEventInit): MediaStreamErrorEvent;
};

interface MediaStreamEvent extends Event {
    readonly stream: MediaStream | null;
}

declare var MediaStreamEvent: {
    prototype: MediaStreamEvent;
    new(type: string, eventInitDict: MediaStreamEventInit): MediaStreamEvent;
};

interface MediaStreamTrackEventType {
    "ended": MediaStreamErrorEvent;
    "mute": Event;
    "overconstrained": MediaStreamErrorEvent;
    "unmute": Event;
}

interface MediaStreamTrack extends EventTarget {
    /*! @ooml-mapto(addEventListener) */ addMediaStreamTrackEventListener<T extends MediaStreamTrackEventType>(type: __Class<T>, listener: EventListener<MediaStreamTrack, T>, options?: boolean | AddEventListenerOptions): void;
    /*! @ooml-mapto(removeEventListener) */ removeMediaStreamTrackEventListener<T extends MediaStreamTrackEventType>(type: __Class<T>, listener: EventListener<MediaStreamTrack, T>, options?: boolean | EventListenerOptions): void;
    enabled: boolean;
    readonly id: string;
    readonly kind: string;
    readonly label: string;
    readonly muted: boolean;
    readonly readonly: boolean;
    readonly readyState: MediaStreamTrackState;
    readonly remote: boolean;
    applyConstraints(constraints: MediaTrackConstraints): Promise<void>;
    clone(): MediaStreamTrack;
    getCapabilities(): MediaTrackCapabilities;
    getConstraints(): MediaTrackConstraints;
    getSettings(): MediaTrackSettings;
    stop(): void;
}

declare var MediaStreamTrack: {
    prototype: MediaStreamTrack;
    new(): MediaStreamTrack;
};

interface MediaStreamTrackEvent extends Event {
    readonly track: MediaStreamTrack;
}

declare var MediaStreamTrackEvent: {
    prototype: MediaStreamTrackEvent;
    new(typeArg: string, eventInitDict?: MediaStreamTrackEventInit): MediaStreamTrackEvent;
};

interface MessageChannel {
    readonly port1: MessagePort;
    readonly port2: MessagePort;
}

declare var MessageChannel: {
    prototype: MessageChannel;
    new(): MessageChannel;
};

interface MessageEvent extends Event {
    readonly data: any;
    readonly origin: string;
    readonly ports: ReadonlyArray<MessagePort>;
    readonly source: Window | null;
    initMessageEvent(type: string, bubbles: boolean, cancelable: boolean, data: any, origin: string, lastEventId: string, source: Window): void;
}

declare var MessageEvent: {
    prototype: MessageEvent;
    new(type: string, eventInitDict?: MessageEventInit): MessageEvent;
};

interface MessagePortEventType {
    "message": MessageEvent;
}

interface MessagePort extends EventTarget {
    /*! @ooml-mapto(addEventListener) */ addMessagePortEventListener<T extends MessagePortEventType>(type: __Class<T>, listener: EventListener<MessagePort, T>, options?: boolean | AddEventListenerOptions): void;
    /*! @ooml-mapto(removeEventListener) */ removeMessagePortEventListener<T extends MessagePortEventType>(type: __Class<T>, listener: EventListener<MessagePort, T>, options?: boolean | EventListenerOptions): void;
    close(): void;
    postMessage(message?: any, transfer?: any[]): void;
    start(): void;
}

declare var MessagePort: {
    prototype: MessagePort;
    new(): MessagePort;
};

interface MimeType {
    readonly description: string;
    readonly enabledPlugin: Plugin;
    readonly suffixes: string;
    readonly type: string;
}

declare var MimeType: {
    prototype: MimeType;
    new(): MimeType;
};

interface MimeTypeArray {
    readonly length: number;
    item(index: number): Plugin;
    namedItem(type: string): Plugin;
    [index: number]: Plugin;
}

declare var MimeTypeArray: {
    prototype: MimeTypeArray;
    new(): MimeTypeArray;
};

interface MouseEvent extends UIEvent {
    readonly altKey: boolean;
    readonly button: number;
    readonly buttons: number;
    readonly clientX: number;
    readonly clientY: number;
    readonly ctrlKey: boolean;
    /** @deprecated */
    readonly fromElement: Element;
    readonly layerX: number;
    readonly layerY: number;
    readonly metaKey: boolean;
    readonly movementX: number;
    readonly movementY: number;
    readonly offsetX: number;
    readonly offsetY: number;
    readonly pageX: number;
    readonly pageY: number;
    readonly relatedTarget: EventTarget;
    readonly screenX: number;
    readonly screenY: number;
    readonly shiftKey: boolean;
    /** @deprecated */
    readonly toElement: Element;
    /** @deprecated */
    readonly which: number;
    readonly x: number;
    readonly y: number;
    getModifierState(keyArg: string): boolean;
    initMouseEvent(typeArg: string, canBubbleArg: boolean, cancelableArg: boolean, viewArg: Window, detailArg: number, screenXArg: number, screenYArg: number, clientXArg: number, clientYArg: number, ctrlKeyArg: boolean, altKeyArg: boolean, shiftKeyArg: boolean, metaKeyArg: boolean, buttonArg: number, relatedTargetArg: EventTarget | null): void;
}

declare var MouseEvent: {
    prototype: MouseEvent;
    new(typeArg: string, eventInitDict?: MouseEventInit): MouseEvent;
};

interface MutationEvent extends Event {
    readonly attrChange: number;
    readonly attrName: string;
    readonly newValue: string;
    readonly prevValue: string;
    readonly relatedNode: Node;
    initMutationEvent(typeArg: string, canBubbleArg: boolean, cancelableArg: boolean, relatedNodeArg: Node, prevValueArg: string, newValueArg: string, attrNameArg: string, attrChangeArg: number): void;
}

declare var MutationEvent: {
    prototype: MutationEvent;
    new(): MutationEvent;
    readonly ADDITION: number;
    readonly MODIFICATION: number;
    readonly REMOVAL: number;
};

interface MutationObserver {
    disconnect(): void;
    observe(target: Node, options: MutationObserverInit): void;
    takeRecords(): MutationRecord[];
}

declare var MutationObserver: {
    prototype: MutationObserver;
    new(callback: MutationCallback): MutationObserver;
};

interface MutationRecord {
    readonly addedNodes: NodeList<Node>;
    readonly attributeName: string | null;
    readonly attributeNamespace: string | null;
    readonly nextSibling: Node | null;
    readonly oldValue: string | null;
    readonly previousSibling: Node | null;
    readonly removedNodes: NodeList<Node>;
    readonly target: Node;
    readonly type: MutationRecordType;
}

declare var MutationRecord: {
    prototype: MutationRecord;
    new(): MutationRecord;
};

interface NamedNodeMap {
    readonly length: number;
    getNamedItem(qualifiedName: string): Attr | null;
    getNamedItemNS(namespace: string | null, localName: string): Attr | null;
    item(index: number): Attr | null;
    removeNamedItem(qualifiedName: string): Attr;
    removeNamedItemNS(namespace: string | null, localName: string): Attr;
    setNamedItem(attr: Attr): Attr | null;
    setNamedItemNS(attr: Attr): Attr | null;
    [index: number]: Attr;
}

declare var NamedNodeMap: {
    prototype: NamedNodeMap;
    new(): NamedNodeMap;
};

interface Navigator {
    readonly activeVRDisplays: ReadonlyArray<VRDisplay>;
    readonly authentication: WebAuthentication;
    readonly cookieEnabled: boolean;
    readonly doNotTrack: string | null;
    gamepadInputEmulation: GamepadInputEmulationType;
    readonly geolocation: Geolocation;
    readonly maxTouchPoints: number;
    readonly mimeTypes: MimeTypeArray;
    readonly msManipulationViewsEnabled: boolean;
    readonly msMaxTouchPoints: number;
    readonly msPointerEnabled: boolean;
    readonly plugins: PluginArray;
    readonly pointerEnabled: boolean;
    readonly serviceWorker: ServiceWorkerContainer;
    readonly webdriver: boolean;
    getGamepads(): (Gamepad | null)[];
    getVRDisplays(): Promise<VRDisplay[]>;
    javaEnabled(): boolean;
    msLaunchUri(uri: string, successCallback?: MSLaunchUriCallback, noHandlerCallback?: MSLaunchUriCallback): void;
    requestMediaKeySystemAccess(keySystem: string, supportedConfigurations: MediaKeySystemConfiguration[]): Promise<MediaKeySystemAccess>;
    vibrate(pattern: number | number[]): boolean;

    readonly appCodeName: string;
    readonly appName: string;
    readonly appVersion: string;
    readonly platform: string;
    readonly product: string;
    readonly productSub: string;
    readonly userAgent: string;
    readonly vendor: string;
    readonly vendorSub: string;
    readonly language: string;
    readonly languages: ReadonlyArray<string>;
    readonly onLine: boolean;
    readonly mediaDevices: MediaDevices;
    getDisplayMedia(constraints: MediaStreamConstraints): Promise<MediaStream>;
    getUserMedia(constraints: MediaStreamConstraints, successCallback: NavigatorUserMediaSuccessCallback, errorCallback: NavigatorUserMediaErrorCallback): void;
    readonly hardwareConcurrency: number;
    sendBeacon(url: string, data?: Blob | BufferSource | FormData | string | null): boolean;

    confirmSiteSpecificTrackingException(args: ConfirmSiteSpecificExceptionsInformation): boolean;
    confirmWebWideTrackingException(args: ExceptionInformation): boolean;
    removeSiteSpecificTrackingException(args: ExceptionInformation): void;
    removeWebWideTrackingException(args: ExceptionInformation): void;
    storeSiteSpecificTrackingException(args: StoreSiteSpecificExceptionsInformation): void;
    storeWebWideTrackingException(args: StoreExceptionsInformation): void;
    msSaveBlob(blob: any, defaultName?: string): boolean;
    msSaveOrOpenBlob(blob: any, defaultName?: string): boolean;
}

declare var Navigator: {
    prototype: Navigator;
    new(): Navigator;
};

interface Node extends EventTarget /*! @ooml-abstract */ {
    readonly baseURI: string | null;
    readonly childNodes: NodeList<Node>;
    readonly firstChild: Node | null;
    readonly isConnected: boolean;
    readonly lastChild: Node | null;
    readonly localName: string | null;
    readonly namespaceURI: string | null;
    readonly nextSibling: Node | null;
    readonly nodeName: string;
    readonly nodeType: number;
    nodeValue: string | null;
    readonly ownerDocument: Document;
    readonly parentElement: HTMLElement | null;
    readonly parentNode: Node | null;
    readonly previousSibling: Node | null;
    textContent: string | null;
    appendChild<T extends Node>(newChild: T): T;
    cloneNode(deep?: boolean): Node;
    compareDocumentPosition(other: Node): number;
    contains(child: Node): boolean;
    hasChildNodes(): boolean;
    insertBefore<T extends Node>(newChild: T, refChild: Node | null): T;
    isDefaultNamespace(namespaceURI: string | null): boolean;
    isEqualNode(arg: Node): boolean;
    isSameNode(other: Node): boolean;
    lookupNamespaceURI(prefix: string | null): string | null;
    lookupPrefix(namespaceURI: string | null): string | null;
    normalize(): void;
    removeChild<T extends Node>(oldChild: T): T;
    replaceChild<T extends Node>(newChild: Node, oldChild: T): T;
}

declare var Node: {
    prototype: Node;
    new(): Node;
    readonly ATTRIBUTE_NODE: number;
    readonly CDATA_SECTION_NODE: number;
    readonly COMMENT_NODE: number;
    readonly DOCUMENT_FRAGMENT_NODE: number;
    readonly DOCUMENT_NODE: number;
    readonly DOCUMENT_POSITION_CONTAINED_BY: number;
    readonly DOCUMENT_POSITION_CONTAINS: number;
    readonly DOCUMENT_POSITION_DISCONNECTED: number;
    readonly DOCUMENT_POSITION_FOLLOWING: number;
    readonly DOCUMENT_POSITION_IMPLEMENTATION_SPECIFIC: number;
    readonly DOCUMENT_POSITION_PRECEDING: number;
    readonly DOCUMENT_TYPE_NODE: number;
    readonly ELEMENT_NODE: number;
    readonly ENTITY_NODE: number;
    readonly ENTITY_REFERENCE_NODE: number;
    readonly NOTATION_NODE: number;
    readonly PROCESSING_INSTRUCTION_NODE: number;
    readonly TEXT_NODE: number;
};

interface NodeFilter /*! @ooml-static */ {
    readonly FILTER_ACCEPT: number;
    readonly FILTER_REJECT: number;
    readonly FILTER_SKIP: number;
    readonly SHOW_ALL: number;
    readonly SHOW_ATTRIBUTE: number;
    readonly SHOW_CDATA_SECTION: number;
    readonly SHOW_COMMENT: number;
    readonly SHOW_DOCUMENT: number;
    readonly SHOW_DOCUMENT_FRAGMENT: number;
    readonly SHOW_DOCUMENT_TYPE: number;
    readonly SHOW_ELEMENT: number;
    readonly SHOW_ENTITY: number;
    readonly SHOW_ENTITY_REFERENCE: number;
    readonly SHOW_NOTATION: number;
    readonly SHOW_PROCESSING_INSTRUCTION: number;
    readonly SHOW_TEXT: number;
    acceptNode(node: Node): number;
}

interface NodeIterator {
    /** @deprecated */
    readonly expandEntityReferences: boolean;
    readonly filter: NodeFilter | null;
    readonly root: Node;
    readonly whatToShow: number;
    detach(): void;
    nextNode(): Node | null;
    previousNode(): Node | null;
}

declare var NodeIterator: {
    prototype: NodeIterator;
    new(): NodeIterator;
};

interface NodeList<T extends Node> {
    readonly length: number;
    item(index: number): Node;
    [index: number]: Node;
}

declare var NodeList: {
    prototype: NodeList<Node>;
    new(): NodeList<Node>;
};

interface NodeSelector {
    querySelector<E extends Element = Element>(selectors: string): E | null;
    querySelectorAll<E extends Element = Element>(selectors: string): NodeList<E>;
}

interface NotificationEventType {
    "click": Event;
    "close": Event;
    "error": Event;
    "show": Event;
}

interface Notification extends EventTarget {
    /*! @ooml-mapto(addEventListener) */ addNotificationEventListener<T extends NotificationEventType>(type: __Class<T>, listener: EventListener<Notification, T>, options?: boolean | AddEventListenerOptions): void;
    /*! @ooml-mapto(removeEventListener) */ removeNotificationEventListener<T extends NotificationEventType>(type: __Class<T>, listener: EventListener<Notification, T>, options?: boolean | EventListenerOptions): void;
    readonly body: string | null;
    readonly data: any;
    readonly dir: NotificationDirection;
    readonly icon: string | null;
    readonly lang: string | null;
    readonly permission: NotificationPermission;
    readonly tag: string | null;
    readonly title: string;
    close(): void;
}

declare var Notification: {
    prototype: Notification;
    new(title: string, options?: NotificationOptions): Notification;
    requestPermission(callback?: NotificationPermissionCallback): Promise<NotificationPermission>;
};

interface OES_element_index_uint {
}

declare var OES_element_index_uint: {
    prototype: OES_element_index_uint;
    new(): OES_element_index_uint;
};

interface OES_standard_derivatives {
}

declare var OES_standard_derivatives: {
    prototype: OES_standard_derivatives;
    new(): OES_standard_derivatives;
    readonly FRAGMENT_SHADER_DERIVATIVE_HINT_OES: number;
};

interface OES_texture_float {
}

declare var OES_texture_float: {
    prototype: OES_texture_float;
    new(): OES_texture_float;
};

interface OES_texture_float_linear {
}

declare var OES_texture_float_linear: {
    prototype: OES_texture_float_linear;
    new(): OES_texture_float_linear;
};

interface OES_texture_half_float {
}

declare var OES_texture_half_float: {
    prototype: OES_texture_half_float;
    new(): OES_texture_half_float;
    readonly HALF_FLOAT_OES: number;
};

interface OES_texture_half_float_linear {
}

declare var OES_texture_half_float_linear: {
    prototype: OES_texture_half_float_linear;
    new(): OES_texture_half_float_linear;
};

interface OES_vertex_array_object {
    readonly VERTEX_ARRAY_BINDING_OES: number;
    bindVertexArrayOES(arrayObject: WebGLVertexArrayObjectOES): void;
    createVertexArrayOES(): WebGLVertexArrayObjectOES;
    deleteVertexArrayOES(arrayObject: WebGLVertexArrayObjectOES): void;
    isVertexArrayOES(value: any): value is WebGLVertexArrayObjectOES;
}

interface OfflineAudioCompletionEvent extends Event {
    readonly renderedBuffer: AudioBuffer;
}

declare var OfflineAudioCompletionEvent: {
    prototype: OfflineAudioCompletionEvent;
    new(): OfflineAudioCompletionEvent;
};

interface OfflineAudioContextEventType extends AudioContextEventType {
    "complete": OfflineAudioCompletionEvent;
}

interface OfflineAudioContext extends AudioContextBase {
    /*! @ooml-mapto(addEventListener) */ addOfflineAudioContextEventListener<T extends OfflineAudioContextEventType>(type: __Class<T>, listener: EventListener<OfflineAudioContext, T>, options?: boolean | AddEventListenerOptions): void;
    /*! @ooml-mapto(removeEventListener) */ removeOfflineAudioContextEventListener<T extends OfflineAudioContextEventType>(type: __Class<T>, listener: EventListener<OfflineAudioContext, T>, options?: boolean | EventListenerOptions): void;
    readonly length: number;
    startRendering(): Promise<AudioBuffer>;
    suspend(suspendTime: number): Promise<void>;
}

declare var OfflineAudioContext: {
    prototype: OfflineAudioContext;
    new(numberOfChannels: number, length: number, sampleRate: number): OfflineAudioContext;
};

interface OscillatorNodeEventType {
    "ended": Event;
}

interface OscillatorNode extends AudioNode {
    /*! @ooml-mapto(addEventListener) */ addOscillatorNodeEventListener<T extends OscillatorNodeEventType>(type: __Class<T>, listener: EventListener<OscillatorNode, T>, options?: boolean | AddEventListenerOptions): void;
    /*! @ooml-mapto(removeEventListener) */ removeOscillatorNodeEventListener<T extends OscillatorNodeEventType>(type: __Class<T>, listener: EventListener<OscillatorNode, T>, options?: boolean | EventListenerOptions): void;
    readonly detune: AudioParam;
    readonly frequency: AudioParam;
    type: OscillatorType;
    setPeriodicWave(periodicWave: PeriodicWave): void;
    start(when?: number): void;
    stop(when?: number): void;
}

declare var OscillatorNode: {
    prototype: OscillatorNode;
    new(): OscillatorNode;
};

interface OverflowEvent extends UIEvent {
    readonly horizontalOverflow: boolean;
    readonly orient: number;
    readonly verticalOverflow: boolean;
}

declare var OverflowEvent: {
    prototype: OverflowEvent;
    new(): OverflowEvent;
    readonly BOTH: number;
    readonly HORIZONTAL: number;
    readonly VERTICAL: number;
};

interface PageTransitionEvent extends Event {
    readonly persisted: boolean;
}

declare var PageTransitionEvent: {
    prototype: PageTransitionEvent;
    new(): PageTransitionEvent;
};

interface PannerNode extends AudioNode {
    coneInnerAngle: number;
    coneOuterAngle: number;
    coneOuterGain: number;
    distanceModel: DistanceModelType;
    maxDistance: number;
    panningModel: PanningModelType;
    refDistance: number;
    rolloffFactor: number;
    /** @deprecated */
    setOrientation(x: number, y: number, z: number): void;
    /** @deprecated */
    setPosition(x: number, y: number, z: number): void;
    /** @deprecated */
    setVelocity(x: number, y: number, z: number): void;
}

declare var PannerNode: {
    prototype: PannerNode;
    new(): PannerNode;
};

interface ParentNode /*! @ooml-interface */ {
    readonly childElementCount: number;
    readonly firstElementChild: Element | null;
    readonly lastElementChild: Element | null;
    readonly children: HTMLCollection;
    querySelector<E extends Element = Element>(selectors: string): E | null;
    querySelectorAll<E extends Element = Element>(selectors: string): NodeList<E>;
}

interface Path2D extends CanvasPathMethods {
}

declare var Path2D: {
    prototype: Path2D;
    new(d?: Path2D | string): Path2D;
};

interface PaymentAddress {
    readonly addressLine: string[];
    readonly city: string;
    readonly country: string;
    readonly dependentLocality: string;
    readonly languageCode: string;
    readonly organization: string;
    readonly phone: string;
    readonly postalCode: string;
    readonly recipient: string;
    readonly region: string;
    readonly sortingCode: string;
    toJSON(): any;
}

declare var PaymentAddress: {
    prototype: PaymentAddress;
    new(): PaymentAddress;
};

interface PaymentRequestEventType {
    "shippingaddresschange": Event;
    "shippingoptionchange": Event;
}

interface PaymentRequest extends EventTarget {
    /*! @ooml-mapto(addEventListener) */ addPaymentRequestEventListener<T extends PaymentRequestEventType>(type: __Class<T>, listener: EventListener<PaymentRequest, T>, options?: boolean | AddEventListenerOptions): void;
    /*! @ooml-mapto(removeEventListener) */ removePaymentRequestEventListener<T extends PaymentRequestEventType>(type: __Class<T>, listener: EventListener<PaymentRequest, T>, options?: boolean | EventListenerOptions): void;
    readonly id: string;
    readonly shippingAddress: PaymentAddress | null;
    readonly shippingOption: string | null;
    readonly shippingType: PaymentShippingType | null;
    abort(): Promise<void>;
    canMakePayment(): Promise<boolean>;
    show(): Promise<PaymentResponse>;
}

declare var PaymentRequest: {
    prototype: PaymentRequest;
    new(methodData: PaymentMethodData[], details: PaymentDetailsInit, options?: PaymentOptions): PaymentRequest;
};

interface PaymentRequestUpdateEvent extends Event {
    updateWith(detailsPromise: Promise<PaymentDetailsUpdate>): void;
}

declare var PaymentRequestUpdateEvent: {
    prototype: PaymentRequestUpdateEvent;
    new(type: string, eventInitDict?: PaymentRequestUpdateEventInit): PaymentRequestUpdateEvent;
};

interface PaymentResponse {
    readonly details: any;
    readonly methodName: string;
    readonly payerEmail: string | null;
    readonly payerName: string | null;
    readonly payerPhone: string | null;
    readonly requestId: string;
    readonly shippingAddress: PaymentAddress | null;
    readonly shippingOption: string | null;
    complete(result?: PaymentComplete): Promise<void>;
    toJSON(): any;
}

declare var PaymentResponse: {
    prototype: PaymentResponse;
    new(): PaymentResponse;
};

interface Performance {
    /** @deprecated */
    readonly navigation: PerformanceNavigation;
    readonly timeOrigin: number;
    /** @deprecated */
    readonly timing: PerformanceTiming;
    clearMarks(markName?: string): void;
    clearMeasures(measureName?: string): void;
    clearResourceTimings(): void;
    getEntries(): any;
    getEntriesByName(name: string, type?: string): any;
    getEntriesByType(type: string): any;
    /** @deprecated */
    getMarks(markName?: string): any;
    /** @deprecated */
    getMeasures(measureName?: string): any;
    mark(markName: string): void;
    measure(measureName: string, startMarkName?: string, endMarkName?: string): void;
    now(): number;
    setResourceTimingBufferSize(maxSize: number): void;
    toJSON(): any;
}

declare var Performance: {
    prototype: Performance;
    new(): Performance;
};

interface PerformanceEntry {
    readonly duration: number;
    readonly entryType: string;
    readonly name: string;
    readonly startTime: number;
    toJSON(): any;
}

declare var PerformanceEntry: {
    prototype: PerformanceEntry;
    new(): PerformanceEntry;
};

interface PerformanceMark extends PerformanceEntry {
}

declare var PerformanceMark: {
    prototype: PerformanceMark;
    new(): PerformanceMark;
};

interface PerformanceMeasure extends PerformanceEntry {
}

declare var PerformanceMeasure: {
    prototype: PerformanceMeasure;
    new(): PerformanceMeasure;
};

interface PerformanceNavigation {
    readonly redirectCount: number;
    readonly type: number;
    toJSON(): any;
}

declare var PerformanceNavigation: {
    prototype: PerformanceNavigation;
    new(): PerformanceNavigation;
    readonly TYPE_BACK_FORWARD: number;
    readonly TYPE_NAVIGATE: number;
    readonly TYPE_RELOAD: number;
    readonly TYPE_RESERVED: number;
};

interface PerformanceNavigationTiming extends PerformanceEntry {
    /** @deprecated */
    readonly connectEnd: number;
    /** @deprecated */
    readonly connectStart: number;
    readonly domComplete: number;
    readonly domContentLoadedEventEnd: number;
    readonly domContentLoadedEventStart: number;
    readonly domInteractive: number;
    /** @deprecated */
    readonly domLoading: number;
    /** @deprecated */
    readonly domainLookupEnd: number;
    /** @deprecated */
    readonly domainLookupStart: number;
    /** @deprecated */
    readonly fetchStart: number;
    readonly loadEventEnd: number;
    readonly loadEventStart: number;
    /** @deprecated */
    readonly navigationStart: number;
    readonly redirectCount: number;
    /** @deprecated */
    readonly redirectEnd: number;
    /** @deprecated */
    readonly redirectStart: number;
    /** @deprecated */
    readonly requestStart: number;
    /** @deprecated */
    readonly responseEnd: number;
    /** @deprecated */
    readonly responseStart: number;
    readonly type: NavigationType;
    readonly unloadEventEnd: number;
    readonly unloadEventStart: number;
    readonly workerStart: number;
}

declare var PerformanceNavigationTiming: {
    prototype: PerformanceNavigationTiming;
    new(): PerformanceNavigationTiming;
};

interface PerformanceResourceTiming extends PerformanceEntry {
    readonly connectEnd: number;
    readonly connectStart: number;
    readonly domainLookupEnd: number;
    readonly domainLookupStart: number;
    readonly fetchStart: number;
    readonly initiatorType: string;
    readonly redirectEnd: number;
    readonly redirectStart: number;
    readonly requestStart: number;
    readonly responseEnd: number;
    readonly responseStart: number;
    readonly workerStart: number;
}

declare var PerformanceResourceTiming: {
    prototype: PerformanceResourceTiming;
    new(): PerformanceResourceTiming;
};

interface PerformanceTiming {
    readonly connectEnd: number;
    readonly connectStart: number;
    readonly domComplete: number;
    readonly domContentLoadedEventEnd: number;
    readonly domContentLoadedEventStart: number;
    readonly domInteractive: number;
    readonly domLoading: number;
    readonly domainLookupEnd: number;
    readonly domainLookupStart: number;
    readonly fetchStart: number;
    readonly loadEventEnd: number;
    readonly loadEventStart: number;
    readonly msFirstPaint: number;
    readonly navigationStart: number;
    readonly redirectEnd: number;
    readonly redirectStart: number;
    readonly requestStart: number;
    readonly responseEnd: number;
    readonly responseStart: number;
    readonly secureConnectionStart: number;
    readonly unloadEventEnd: number;
    readonly unloadEventStart: number;
    toJSON(): any;
}

declare var PerformanceTiming: {
    prototype: PerformanceTiming;
    new(): PerformanceTiming;
};

interface PeriodicWave {
}

declare var PeriodicWave: {
    prototype: PeriodicWave;
    new(): PeriodicWave;
};

interface PermissionRequest extends DeferredPermissionRequest {
    readonly state: MSWebViewPermissionState;
    defer(): void;
}

declare var PermissionRequest: {
    prototype: PermissionRequest;
    new(): PermissionRequest;
};

interface PermissionRequestedEvent extends Event {
    readonly permissionRequest: PermissionRequest;
}

declare var PermissionRequestedEvent: {
    prototype: PermissionRequestedEvent;
    new(): PermissionRequestedEvent;
};

interface Plugin {
    readonly description: string;
    readonly filename: string;
    readonly length: number;
    readonly name: string;
    readonly version: string;
    item(index: number): MimeType;
    namedItem(type: string): MimeType;
    [index: number]: MimeType;
}

declare var Plugin: {
    prototype: Plugin;
    new(): Plugin;
};

interface PluginArray {
    readonly length: number;
    item(index: number): Plugin;
    namedItem(name: string): Plugin;
    refresh(reload?: boolean): void;
    [index: number]: Plugin;
}

declare var PluginArray: {
    prototype: PluginArray;
    new(): PluginArray;
};

interface PointerEvent extends MouseEvent {
    readonly currentPoint: any;
    readonly height: number;
    readonly hwTimestamp: number;
    readonly intermediatePoints: any;
    readonly isPrimary: boolean;
    readonly pointerId: number;
    readonly pointerType: any;
    readonly pressure: number;
    readonly rotation: number;
    readonly tiltX: number;
    readonly tiltY: number;
    readonly width: number;
    getCurrentPoint(element: Element): void;
    getIntermediatePoints(element: Element): void;
    initPointerEvent(typeArg: string, canBubbleArg: boolean, cancelableArg: boolean, viewArg: Window, detailArg: number, screenXArg: number, screenYArg: number, clientXArg: number, clientYArg: number, ctrlKeyArg: boolean, altKeyArg: boolean, shiftKeyArg: boolean, metaKeyArg: boolean, buttonArg: number, relatedTargetArg: EventTarget, offsetXArg: number, offsetYArg: number, widthArg: number, heightArg: number, pressure: number, rotation: number, tiltX: number, tiltY: number, pointerIdArg: number, pointerType: any, hwTimestampArg: number, isPrimary: boolean): void;
}

declare var PointerEvent: {
    prototype: PointerEvent;
    new(typeArg: string, eventInitDict?: PointerEventInit): PointerEvent;
};

interface PopStateEvent extends Event {
    readonly state: any;
}

declare var PopStateEvent: {
    prototype: PopStateEvent;
    new(type: string, eventInitDict?: PopStateEventInit): PopStateEvent;
};

interface Position {
    readonly coords: Coordinates;
    readonly timestamp: number;
}

declare var Position: {
    prototype: Position;
    new(): Position;
};

interface PositionError {
    readonly code: number;
    readonly message: string;
}

declare var PositionError: {
    prototype: PositionError;
    new(): PositionError;
    readonly PERMISSION_DENIED: number;
    readonly POSITION_UNAVAILABLE: number;
    readonly TIMEOUT: number;
};

interface ProcessingInstruction extends CharacterData {
    readonly target: string;
}

declare var ProcessingInstruction: {
    prototype: ProcessingInstruction;
    new(): ProcessingInstruction;
};

interface ProgressEvent extends Event {
    readonly lengthComputable: boolean;
    readonly loaded: number;
    readonly total: number;
    initProgressEvent(typeArg: string, canBubbleArg: boolean, cancelableArg: boolean, lengthComputableArg: boolean, loadedArg: number, totalArg: number): void;
}

declare var ProgressEvent: {
    prototype: ProgressEvent;
    new(typeArg: string, eventInitDict?: ProgressEventInit): ProgressEvent;
};

interface PromiseRejectionEvent extends Event {
    readonly promise: Promise<any>;
    readonly reason: any;
}

interface PromiseRejectionEventInit extends EventInit {
    promise: Promise<any>;
    reason?: any;
}

interface PushManager {
    readonly supportedContentEncodings: ReadonlyArray<string>;
    getSubscription(): Promise<PushSubscription | null>;
    permissionState(options?: PushSubscriptionOptionsInit): Promise<PushPermissionState>;
    subscribe(options?: PushSubscriptionOptionsInit): Promise<PushSubscription>;
}

declare var PushManager: {
    prototype: PushManager;
    new(): PushManager;
};

interface PushSubscription {
    readonly endpoint: string;
    readonly expirationTime: number | null;
    readonly options: PushSubscriptionOptions;
    getKey(name: PushEncryptionKeyName): ArrayBuffer | null;
    toJSON(): any;
    unsubscribe(): Promise<boolean>;
}

declare var PushSubscription: {
    prototype: PushSubscription;
    new(): PushSubscription;
};

interface PushSubscriptionOptions {
    readonly applicationServerKey: ArrayBuffer | null;
    readonly userVisibleOnly: boolean;
}

declare var PushSubscriptionOptions: {
    prototype: PushSubscriptionOptions;
    new(): PushSubscriptionOptions;
};

interface RTCDTMFToneChangeEvent extends Event {
    readonly tone: string;
}

declare var RTCDTMFToneChangeEvent: {
    prototype: RTCDTMFToneChangeEvent;
    new(typeArg: string, eventInitDict: RTCDTMFToneChangeEventInit): RTCDTMFToneChangeEvent;
};

interface RTCDtlsTransportEventType {
    "dtlsstatechange": RTCDtlsTransportStateChangedEvent;
    "error": Event;
}

interface RTCDtlsTransport extends RTCStatsProvider {
    /*! @ooml-mapto(addEventListener) */ addRTCDtlsTransportEventListener<T extends RTCDtlsTransportEventType>(type: __Class<T>, listener: EventListener<RTCDtlsTransport, T>, options?: boolean | AddEventListenerOptions): void;
    /*! @ooml-mapto(removeEventListener) */ removeRTCDtlsTransportEventListener<T extends RTCDtlsTransportEventType>(type: __Class<T>, listener: EventListener<RTCDtlsTransport, T>, options?: boolean | EventListenerOptions): void;
    readonly state: RTCDtlsTransportState;
    readonly transport: RTCIceTransport;
    getLocalParameters(): RTCDtlsParameters;
    getRemoteCertificates(): ArrayBuffer[];
    getRemoteParameters(): RTCDtlsParameters | null;
    start(remoteParameters: RTCDtlsParameters): void;
    stop(): void;
}

declare var RTCDtlsTransport: {
    prototype: RTCDtlsTransport;
    new(transport: RTCIceTransport): RTCDtlsTransport;
};

interface RTCDtlsTransportStateChangedEvent extends Event {
    readonly state: RTCDtlsTransportState;
}

declare var RTCDtlsTransportStateChangedEvent: {
    prototype: RTCDtlsTransportStateChangedEvent;
    new(): RTCDtlsTransportStateChangedEvent;
};

interface RTCDtmfSenderEventType {
    "tonechange": RTCDTMFToneChangeEvent;
}

interface RTCDtmfSender extends EventTarget {
    /*! @ooml-mapto(addEventListener) */ addRTCDtmfSenderEventListener<T extends RTCDtmfSenderEventType>(type: __Class<T>, listener: EventListener<RTCDtmfSender, T>, options?: boolean | AddEventListenerOptions): void;
    /*! @ooml-mapto(removeEventListener) */ removeRTCDtmfSenderEventListener<T extends RTCDtmfSenderEventType>(type: __Class<T>, listener: EventListener<RTCDtmfSender, T>, options?: boolean | EventListenerOptions): void;
    readonly canInsertDTMF: boolean;
    readonly duration: number;
    readonly interToneGap: number;
    readonly sender: RTCRtpSender;
    readonly toneBuffer: string;
    insertDTMF(tones: string, duration?: number, interToneGap?: number): void;
}

declare var RTCDtmfSender: {
    prototype: RTCDtmfSender;
    new(sender: RTCRtpSender): RTCDtmfSender;
};

interface RTCIceCandidate {
    candidate: string | null;
    sdpMLineIndex: number | null;
    sdpMid: string | null;
    toJSON(): any;
}

declare var RTCIceCandidate: {
    prototype: RTCIceCandidate;
    new(candidateInitDict?: RTCIceCandidateInit): RTCIceCandidate;
};

interface RTCIceCandidatePairChangedEvent extends Event {
    readonly pair: RTCIceCandidatePair;
}

declare var RTCIceCandidatePairChangedEvent: {
    prototype: RTCIceCandidatePairChangedEvent;
    new(): RTCIceCandidatePairChangedEvent;
};

interface RTCIceGathererEventType {
    "error": Event;
    "localcandidate": RTCIceGathererEvent;
}

interface RTCIceGatherer extends RTCStatsProvider {
    /*! @ooml-mapto(addEventListener) */ addRTCIceGathererEventListener<T extends RTCIceGathererEventType>(type: __Class<T>, listener: EventListener<RTCIceGatherer, T>, options?: boolean | AddEventListenerOptions): void;
    /*! @ooml-mapto(removeEventListener) */ removeRTCIceGathererEventListener<T extends RTCIceGathererEventType>(type: __Class<T>, listener: EventListener<RTCIceGatherer, T>, options?: boolean | EventListenerOptions): void;
    readonly component: RTCIceComponent;
    createAssociatedGatherer(): RTCIceGatherer;
    getLocalCandidates(): RTCIceCandidateDictionary[];
    getLocalParameters(): RTCIceParameters;
}

declare var RTCIceGatherer: {
    prototype: RTCIceGatherer;
    new(options: RTCIceGatherOptions): RTCIceGatherer;
};

interface RTCIceGathererEvent extends Event {
    readonly candidate: RTCIceCandidateDictionary | RTCIceCandidateComplete;
}

declare var RTCIceGathererEvent: {
    prototype: RTCIceGathererEvent;
    new(): RTCIceGathererEvent;
};

interface RTCIceTransportEventType {
    "candidatepairchange": RTCIceCandidatePairChangedEvent;
    "icestatechange": RTCIceTransportStateChangedEvent;
}

interface RTCIceTransport extends RTCStatsProvider {
    /*! @ooml-mapto(addEventListener) */ addRTCIceTransportEventListener<T extends RTCIceTransportEventType>(type: __Class<T>, listener: EventListener<RTCIceTransport, T>, options?: boolean | AddEventListenerOptions): void;
    /*! @ooml-mapto(removeEventListener) */ removeRTCIceTransportEventListener<T extends RTCIceTransportEventType>(type: __Class<T>, listener: EventListener<RTCIceTransport, T>, options?: boolean | EventListenerOptions): void;
    readonly component: RTCIceComponent;
    readonly iceGatherer: RTCIceGatherer | null;
    readonly role: RTCIceRole;
    readonly state: RTCIceTransportState;
    addRemoteCandidate(remoteCandidate: RTCIceCandidateDictionary | RTCIceCandidateComplete): void;
    createAssociatedTransport(): RTCIceTransport;
    getNominatedCandidatePair(): RTCIceCandidatePair | null;
    getRemoteCandidates(): RTCIceCandidateDictionary[];
    getRemoteParameters(): RTCIceParameters | null;
    setRemoteCandidates(remoteCandidates: RTCIceCandidateDictionary[]): void;
    start(gatherer: RTCIceGatherer, remoteParameters: RTCIceParameters, role?: RTCIceRole): void;
    stop(): void;
}

declare var RTCIceTransport: {
    prototype: RTCIceTransport;
    new(): RTCIceTransport;
};

interface RTCIceTransportStateChangedEvent extends Event {
    readonly state: RTCIceTransportState;
}

declare var RTCIceTransportStateChangedEvent: {
    prototype: RTCIceTransportStateChangedEvent;
    new(): RTCIceTransportStateChangedEvent;
};

interface RTCPeerConnectionEventType {
    "addstream": MediaStreamEvent;
    "icecandidate": RTCPeerConnectionIceEvent;
    "iceconnectionstatechange": Event;
    "icegatheringstatechange": Event;
    "negotiationneeded": Event;
    "removestream": MediaStreamEvent;
    "signalingstatechange": Event;
}

interface RTCPeerConnection extends EventTarget {
    /*! @ooml-mapto(addEventListener) */ addRTCPeerConnectionEventListener<T extends RTCPeerConnectionEventType>(type: __Class<T>, listener: EventListener<RTCPeerConnection, T>, options?: boolean | AddEventListenerOptions): void;
    /*! @ooml-mapto(removeEventListener) */ removeRTCPeerConnectionEventListener<T extends RTCPeerConnectionEventType>(type: __Class<T>, listener: EventListener<RTCPeerConnection, T>, options?: boolean | EventListenerOptions): void;
    readonly canTrickleIceCandidates: boolean | null;
    readonly iceConnectionState: RTCIceConnectionState;
    readonly iceGatheringState: RTCIceGatheringState;
    readonly localDescription: RTCSessionDescription | null;
    readonly remoteDescription: RTCSessionDescription | null;
    readonly signalingState: RTCSignalingState;
    addIceCandidate(candidate: RTCIceCandidateInit | RTCIceCandidate): Promise<void>;
    addStream(stream: MediaStream): void;
    close(): void;
    createAnswer(options?: RTCOfferOptions): Promise<RTCSessionDescriptionInit>;
    createOffer(options?: RTCOfferOptions): Promise<RTCSessionDescriptionInit>;
    getConfiguration(): RTCConfiguration;
    getLocalStreams(): MediaStream[];
    getRemoteStreams(): MediaStream[];
    getStats(selector: MediaStreamTrack | null, successCallback?: RTCStatsCallback, failureCallback?: RTCPeerConnectionErrorCallback): Promise<RTCStatsReport>;
    getStreamById(streamId: string): MediaStream | null;
    removeStream(stream: MediaStream): void;
    setLocalDescription(description: RTCSessionDescriptionInit): Promise<void>;
    setRemoteDescription(description: RTCSessionDescriptionInit): Promise<void>;
}

declare var RTCPeerConnection: {
    prototype: RTCPeerConnection;
    new(configuration: RTCConfiguration): RTCPeerConnection;
};

interface RTCPeerConnectionIceEvent extends Event {
    readonly candidate: RTCIceCandidate;
}

declare var RTCPeerConnectionIceEvent: {
    prototype: RTCPeerConnectionIceEvent;
    new(type: string, eventInitDict: RTCPeerConnectionIceEventInit): RTCPeerConnectionIceEvent;
};

interface RTCRtpReceiverEventType {
    "error": Event;
    "msdecodercapacitychange": Event;
    "msdsh": Event;
}

interface RTCRtpReceiver extends RTCStatsProvider {
    /*! @ooml-mapto(addEventListener) */ addRTCRtpReceiverEventListener<T extends RTCRtpReceiverEventType>(type: __Class<T>, listener: EventListener<RTCRtpReceiver, T>, options?: boolean | AddEventListenerOptions): void;
    /*! @ooml-mapto(removeEventListener) */ removeRTCRtpReceiverEventListener<T extends RTCRtpReceiverEventType>(type: __Class<T>, listener: EventListener<RTCRtpReceiver, T>, options?: boolean | EventListenerOptions): void;
    readonly rtcpTransport: RTCDtlsTransport;
    readonly track: MediaStreamTrack | null;
    readonly transport: RTCDtlsTransport | RTCSrtpSdesTransport;
    getContributingSources(): RTCRtpContributingSource[];
    receive(parameters: RTCRtpParameters): void;
    requestSendCSRC(csrc: number): void;
    setTransport(transport: RTCDtlsTransport | RTCSrtpSdesTransport, rtcpTransport?: RTCDtlsTransport): void;
    stop(): void;
}

declare var RTCRtpReceiver: {
    prototype: RTCRtpReceiver;
    new(transport: RTCDtlsTransport | RTCSrtpSdesTransport, kind: string, rtcpTransport?: RTCDtlsTransport): RTCRtpReceiver;
    getCapabilities(kind?: string): RTCRtpCapabilities;
};

interface RTCRtpSenderEventType {
    "error": Event;
    "ssrcconflict": RTCSsrcConflictEvent;
}

interface RTCRtpSender extends RTCStatsProvider {
    /*! @ooml-mapto(addEventListener) */ addRTCRtpSenderEventListener<T extends RTCRtpSenderEventType>(type: __Class<T>, listener: EventListener<RTCRtpSender, T>, options?: boolean | AddEventListenerOptions): void;
    /*! @ooml-mapto(removeEventListener) */ removeRTCRtpSenderEventListener<T extends RTCRtpSenderEventType>(type: __Class<T>, listener: EventListener<RTCRtpSender, T>, options?: boolean | EventListenerOptions): void;
    readonly rtcpTransport: RTCDtlsTransport;
    readonly track: MediaStreamTrack;
    readonly transport: RTCDtlsTransport | RTCSrtpSdesTransport;
    send(parameters: RTCRtpParameters): void;
    setTrack(track: MediaStreamTrack): void;
    setTransport(transport: RTCDtlsTransport | RTCSrtpSdesTransport, rtcpTransport?: RTCDtlsTransport): void;
    stop(): void;
}

declare var RTCRtpSender: {
    prototype: RTCRtpSender;
    new(track: MediaStreamTrack, transport: RTCDtlsTransport | RTCSrtpSdesTransport, rtcpTransport?: RTCDtlsTransport): RTCRtpSender;
    getCapabilities(kind?: string): RTCRtpCapabilities;
};

interface RTCSessionDescription {
    sdp: string | null;
    type: RTCSdpType | null;
    toJSON(): any;
}

declare var RTCSessionDescription: {
    prototype: RTCSessionDescription;
    new(descriptionInitDict?: RTCSessionDescriptionInit): RTCSessionDescription;
};

interface RTCSrtpSdesTransportEventType {
    "error": Event;
}

interface RTCSrtpSdesTransport extends EventTarget {
    /*! @ooml-mapto(addEventListener) */ addRTCSrtpSdesTransportEventListener<T extends RTCSrtpSdesTransportEventType>(type: __Class<T>, listener: EventListener<RTCSrtpSdesTransport, T>, options?: boolean | AddEventListenerOptions): void;
    /*! @ooml-mapto(removeEventListener) */ removeRTCSrtpSdesTransportEventListener<T extends RTCSrtpSdesTransportEventType>(type: __Class<T>, listener: EventListener<RTCSrtpSdesTransport, T>, options?: boolean | EventListenerOptions): void;
    readonly transport: RTCIceTransport;
}

declare var RTCSrtpSdesTransport: {
    prototype: RTCSrtpSdesTransport;
    new(transport: RTCIceTransport, encryptParameters: RTCSrtpSdesParameters, decryptParameters: RTCSrtpSdesParameters): RTCSrtpSdesTransport;
    getLocalParameters(): RTCSrtpSdesParameters[];
};

interface RTCSsrcConflictEvent extends Event {
    readonly ssrc: number;
}

declare var RTCSsrcConflictEvent: {
    prototype: RTCSsrcConflictEvent;
    new(): RTCSsrcConflictEvent;
};

interface RTCStatsProvider extends EventTarget {
    getStats(): Promise<RTCStatsReport>;
    msGetStats(): Promise<RTCStatsReport>;
}

declare var RTCStatsProvider: {
    prototype: RTCStatsProvider;
    new(): RTCStatsProvider;
};

interface RandomSource {
    getRandomValues<T extends TypedArray<T>>(array: T): T;
}

declare var RandomSource: {
    prototype: RandomSource;
    new(): RandomSource;
};

interface Range {
    readonly collapsed: boolean;
    readonly commonAncestorContainer: Node;
    readonly endContainer: Node;
    readonly endOffset: number;
    readonly startContainer: Node;
    readonly startOffset: number;
    cloneContents(): DocumentFragment;
    cloneRange(): Range;
    collapse(toStart?: boolean): void;
    compareBoundaryPoints(how: number, sourceRange: Range): number;
    createContextualFragment(fragment: string): DocumentFragment;
    deleteContents(): void;
    detach(): void;
    expand(Unit: ExpandGranularity): boolean;
    extractContents(): DocumentFragment;
    getBoundingClientRect(): ClientRect | DOMRect;
    getClientRects(): ClientRectList | DOMRectList;
    insertNode(node: Node): void;
    isPointInRange(node: Node, offset: number): boolean;
    selectNode(node: Node): void;
    selectNodeContents(node: Node): void;
    setEnd(node: Node, offset: number): void;
    setEndAfter(node: Node): void;
    setEndBefore(node: Node): void;
    setStart(node: Node, offset: number): void;
    setStartAfter(node: Node): void;
    setStartBefore(node: Node): void;
    surroundContents(newParent: Node): void;
}

declare var Range: {
    prototype: Range;
    new(): Range;
    readonly END_TO_END: number;
    readonly END_TO_START: number;
    readonly START_TO_END: number;
    readonly START_TO_START: number;
};

interface ReadableStream {
    readonly locked: boolean;
    cancel(): Promise<void>;
    getReader(): ReadableStreamReader;
}

declare var ReadableStream: {
    prototype: ReadableStream;
    new(): ReadableStream;
};

interface ReadableStreamReader {
    cancel(): Promise<void>;
    read(): Promise<any>;
    releaseLock(): void;
}

declare var ReadableStreamReader: {
    prototype: ReadableStreamReader;
    new(): ReadableStreamReader;
};

interface Request extends Body {
    readonly cache: RequestCache;
    readonly credentials: RequestCredentials;
    readonly destination: RequestDestination;
    readonly headers: Headers;
    readonly integrity: string;
    readonly keepalive: boolean;
    readonly method: string;
    readonly mode: RequestMode;
    readonly redirect: RequestRedirect;
    readonly referrer: string;
    readonly referrerPolicy: ReferrerPolicy;
    readonly signal: AbortSignal | null;
    readonly type: RequestType;
    readonly url: string;
    clone(): Request;
}

declare var Request: {
    prototype: Request;
    new(input: Request | string, init?: RequestInit): Request;
};

interface Response extends Body {
    readonly body: ReadableStream | null;
    readonly headers: Headers;
    readonly ok: boolean;
    readonly redirected: boolean;
    readonly status: number;
    readonly statusText: string;
    readonly type: ResponseType;
    readonly url: string;
    clone(): Response;
}

declare var Response: {
    prototype: Response;
    new(body?: Blob | BufferSource | FormData | string | null, init?: ResponseInit): Response;
    error(): Response;
    redirect(url: string, status?: number): Response;
};

interface SVGAElement extends SVGGraphicsElement, SVGURIReference {
    /*! @ooml-mapto(addEventListener) */ addSVGAElementEventListener<T extends SVGElementEventType>(type: __Class<T>, listener: EventListener<SVGAElement, T>, options?: boolean | AddEventListenerOptions): void;
    /*! @ooml-mapto(removeEventListener) */ removeSVGAElementEventListener<T extends SVGElementEventType>(type: __Class<T>, listener: EventListener<SVGAElement, T>, options?: boolean | EventListenerOptions): void;
    readonly target: SVGAnimatedString;
}

declare var SVGAElement: {
    prototype: SVGAElement;
    new(): SVGAElement;
};

interface SVGAngle {
    readonly unitType: number;
    value: number;
    valueAsString: string;
    valueInSpecifiedUnits: number;
    convertToSpecifiedUnits(unitType: number): void;
    newValueSpecifiedUnits(unitType: number, valueInSpecifiedUnits: number): void;
}

declare var SVGAngle: {
    prototype: SVGAngle;
    new(): SVGAngle;
    readonly SVG_ANGLETYPE_DEG: number;
    readonly SVG_ANGLETYPE_GRAD: number;
    readonly SVG_ANGLETYPE_RAD: number;
    readonly SVG_ANGLETYPE_UNKNOWN: number;
    readonly SVG_ANGLETYPE_UNSPECIFIED: number;
};

interface SVGAnimatedAngle {
    readonly animVal: SVGAngle;
    readonly baseVal: SVGAngle;
}

declare var SVGAnimatedAngle: {
    prototype: SVGAnimatedAngle;
    new(): SVGAnimatedAngle;
};

interface SVGAnimatedBoolean {
    readonly animVal: boolean;
    baseVal: boolean;
}

declare var SVGAnimatedBoolean: {
    prototype: SVGAnimatedBoolean;
    new(): SVGAnimatedBoolean;
};

interface SVGAnimatedEnumeration {
    readonly animVal: number;
    baseVal: number;
}

declare var SVGAnimatedEnumeration: {
    prototype: SVGAnimatedEnumeration;
    new(): SVGAnimatedEnumeration;
};

interface SVGAnimatedInteger {
    readonly animVal: number;
    baseVal: number;
}

declare var SVGAnimatedInteger: {
    prototype: SVGAnimatedInteger;
    new(): SVGAnimatedInteger;
};

interface SVGAnimatedLength {
    readonly animVal: SVGLength;
    readonly baseVal: SVGLength;
}

declare var SVGAnimatedLength: {
    prototype: SVGAnimatedLength;
    new(): SVGAnimatedLength;
};

interface SVGAnimatedLengthList {
    readonly animVal: SVGLengthList;
    readonly baseVal: SVGLengthList;
}

declare var SVGAnimatedLengthList: {
    prototype: SVGAnimatedLengthList;
    new(): SVGAnimatedLengthList;
};

interface SVGAnimatedNumber {
    readonly animVal: number;
    baseVal: number;
}

declare var SVGAnimatedNumber: {
    prototype: SVGAnimatedNumber;
    new(): SVGAnimatedNumber;
};

interface SVGAnimatedNumberList {
    readonly animVal: SVGNumberList;
    readonly baseVal: SVGNumberList;
}

declare var SVGAnimatedNumberList: {
    prototype: SVGAnimatedNumberList;
    new(): SVGAnimatedNumberList;
};

interface SVGAnimatedPoints /*! @ooml-interface */ {
    readonly animatedPoints: SVGPointList;
    readonly points: SVGPointList;
}

interface SVGAnimatedPreserveAspectRatio {
    readonly animVal: SVGPreserveAspectRatio;
    readonly baseVal: SVGPreserveAspectRatio;
}

declare var SVGAnimatedPreserveAspectRatio: {
    prototype: SVGAnimatedPreserveAspectRatio;
    new(): SVGAnimatedPreserveAspectRatio;
};

interface SVGAnimatedRect {
    readonly animVal: SVGRect;
    readonly baseVal: SVGRect;
}

declare var SVGAnimatedRect: {
    prototype: SVGAnimatedRect;
    new(): SVGAnimatedRect;
};

interface SVGAnimatedString {
    readonly animVal: string;
    baseVal: string;
}

declare var SVGAnimatedString: {
    prototype: SVGAnimatedString;
    new(): SVGAnimatedString;
};

interface SVGAnimatedTransformList {
    readonly animVal: SVGTransformList;
    readonly baseVal: SVGTransformList;
}

declare var SVGAnimatedTransformList: {
    prototype: SVGAnimatedTransformList;
    new(): SVGAnimatedTransformList;
};

interface SVGCircleElement extends SVGGraphicsElement {
    /*! @ooml-mapto(addEventListener) */ addSVGCircleElementEventListener<T extends SVGElementEventType>(type: __Class<T>, listener: EventListener<SVGCircleElement, T>, options?: boolean | AddEventListenerOptions): void;
    /*! @ooml-mapto(removeEventListener) */ removeSVGCircleElementEventListener<T extends SVGElementEventType>(type: __Class<T>, listener: EventListener<SVGCircleElement, T>, options?: boolean | EventListenerOptions): void;
    readonly cx: SVGAnimatedLength;
    readonly cy: SVGAnimatedLength;
    readonly r: SVGAnimatedLength;
}

declare var SVGCircleElement: {
    prototype: SVGCircleElement;
    new(): SVGCircleElement;
};

interface SVGClipPathElement extends SVGGraphicsElement {
    /*! @ooml-mapto(addEventListener) */ addSVGClipPathElementEventListener<T extends SVGElementEventType>(type: __Class<T>, listener: EventListener<SVGClipPathElement, T>, options?: boolean | AddEventListenerOptions): void;
    /*! @ooml-mapto(removeEventListener) */ removeSVGClipPathElementEventListener<T extends SVGElementEventType>(type: __Class<T>, listener: EventListener<SVGClipPathElement, T>, options?: boolean | EventListenerOptions): void;
    readonly clipPathUnits: SVGAnimatedEnumeration;
}

declare var SVGClipPathElement: {
    prototype: SVGClipPathElement;
    new(): SVGClipPathElement;
};

interface SVGComponentTransferFunctionElement extends SVGElement {
    /*! @ooml-mapto(addEventListener) */ addSVGComponentTransferFunctionElementEventListener<T extends SVGElementEventType>(type: __Class<T>, listener: EventListener<SVGComponentTransferFunctionElement, T>, options?: boolean | AddEventListenerOptions): void;
    /*! @ooml-mapto(removeEventListener) */ removeSVGComponentTransferFunctionElementEventListener<T extends SVGElementEventType>(type: __Class<T>, listener: EventListener<SVGComponentTransferFunctionElement, T>, options?: boolean | EventListenerOptions): void;
    readonly amplitude: SVGAnimatedNumber;
    readonly exponent: SVGAnimatedNumber;
    readonly intercept: SVGAnimatedNumber;
    readonly offset: SVGAnimatedNumber;
    readonly slope: SVGAnimatedNumber;
    readonly tableValues: SVGAnimatedNumberList;
    readonly type: SVGAnimatedEnumeration;
}

declare var SVGComponentTransferFunctionElement: {
    prototype: SVGComponentTransferFunctionElement;
    new(): SVGComponentTransferFunctionElement;
    readonly SVG_FECOMPONENTTRANSFER_TYPE_DISCRETE: number;
    readonly SVG_FECOMPONENTTRANSFER_TYPE_GAMMA: number;
    readonly SVG_FECOMPONENTTRANSFER_TYPE_IDENTITY: number;
    readonly SVG_FECOMPONENTTRANSFER_TYPE_LINEAR: number;
    readonly SVG_FECOMPONENTTRANSFER_TYPE_TABLE: number;
    readonly SVG_FECOMPONENTTRANSFER_TYPE_UNKNOWN: number;
};

interface SVGDefsElement extends SVGGraphicsElement {
    /*! @ooml-mapto(addEventListener) */ addSVGDefsElementEventListener<T extends SVGElementEventType>(type: __Class<T>, listener: EventListener<SVGDefsElement, T>, options?: boolean | AddEventListenerOptions): void;
    /*! @ooml-mapto(removeEventListener) */ removeSVGDefsElementEventListener<T extends SVGElementEventType>(type: __Class<T>, listener: EventListener<SVGDefsElement, T>, options?: boolean | EventListenerOptions): void;
}

declare var SVGDefsElement: {
    prototype: SVGDefsElement;
    new(): SVGDefsElement;
};

interface SVGDescElement extends SVGElement {
    /*! @ooml-mapto(addEventListener) */ addSVGDescElementEventListener<T extends SVGElementEventType>(type: __Class<T>, listener: EventListener<SVGDescElement, T>, options?: boolean | AddEventListenerOptions): void;
    /*! @ooml-mapto(removeEventListener) */ removeSVGDescElementEventListener<T extends SVGElementEventType>(type: __Class<T>, listener: EventListener<SVGDescElement, T>, options?: boolean | EventListenerOptions): void;
}

declare var SVGDescElement: {
    prototype: SVGDescElement;
    new(): SVGDescElement;
};

interface SVGElementEventType extends ElementEventType {
    "click": MouseEvent;
    "dblclick": MouseEvent;
    "focusin": FocusEvent;
    "focusout": FocusEvent;
    "load": Event;
    "mousedown": MouseEvent;
    "mousemove": MouseEvent;
    "mouseout": MouseEvent;
    "mouseover": MouseEvent;
    "mouseup": MouseEvent;
}

interface SVGElement extends Element, ElementCSSInlineStyle {
    /*! @ooml-mapto(addEventListener) */ addSVGElementEventListener<T extends SVGElementEventType>(type: __Class<T>, listener: EventListener<SVGElement, T>, options?: boolean | AddEventListenerOptions): void;
    /*! @ooml-mapto(removeEventListener) */ removeSVGElementEventListener<T extends SVGElementEventType>(type: __Class<T>, listener: EventListener<SVGElement, T>, options?: boolean | EventListenerOptions): void;
    readonly className: any;
    readonly ownerSVGElement: SVGSVGElement | null;
    readonly viewportElement: SVGElement | null;
    /** @deprecated */
    xmlbase: string;
    closest<K extends SVGElement>(selector: __Class<K>): K | null;
    getElementsByTagName<K extends SVGElement>(name: __Class<K>): NodeList<K>;
}

declare var SVGElement: {
    prototype: SVGElement;
    new(): SVGElement;
};

interface SVGElementInstance extends EventTarget {
    readonly childNodes: SVGElementInstanceList;
    readonly correspondingElement: SVGElement;
    readonly correspondingUseElement: SVGUseElement;
    readonly firstChild: SVGElementInstance;
    readonly lastChild: SVGElementInstance;
    readonly nextSibling: SVGElementInstance;
    readonly parentNode: SVGElementInstance;
    readonly previousSibling: SVGElementInstance;
}

declare var SVGElementInstance: {
    prototype: SVGElementInstance;
    new(): SVGElementInstance;
};

interface SVGElementInstanceList {
    /** @deprecated */
    readonly length: number;
    /** @deprecated */
    item(index: number): SVGElementInstance;
}

declare var SVGElementInstanceList: {
    prototype: SVGElementInstanceList;
    new(): SVGElementInstanceList;
};

interface SVGEllipseElement extends SVGGraphicsElement {
    /*! @ooml-mapto(addEventListener) */ addSVGEllipseElementEventListener<T extends SVGElementEventType>(type: __Class<T>, listener: EventListener<SVGEllipseElement, T>, options?: boolean | AddEventListenerOptions): void;
    /*! @ooml-mapto(removeEventListener) */ removeSVGEllipseElementEventListener<T extends SVGElementEventType>(type: __Class<T>, listener: EventListener<SVGEllipseElement, T>, options?: boolean | EventListenerOptions): void;
    readonly cx: SVGAnimatedLength;
    readonly cy: SVGAnimatedLength;
    readonly rx: SVGAnimatedLength;
    readonly ry: SVGAnimatedLength;
}

declare var SVGEllipseElement: {
    prototype: SVGEllipseElement;
    new(): SVGEllipseElement;
};

interface SVGFEBlendElement extends SVGElement, SVGFilterPrimitiveStandardAttributes {
    /*! @ooml-mapto(addEventListener) */ addSVGFEBlendElementEventListener<T extends SVGElementEventType>(type: __Class<T>, listener: EventListener<SVGFEBlendElement, T>, options?: boolean | AddEventListenerOptions): void;
    /*! @ooml-mapto(removeEventListener) */ removeSVGFEBlendElementEventListener<T extends SVGElementEventType>(type: __Class<T>, listener: EventListener<SVGFEBlendElement, T>, options?: boolean | EventListenerOptions): void;
    readonly in1: SVGAnimatedString;
    readonly in2: SVGAnimatedString;
    readonly mode: SVGAnimatedEnumeration;
}

declare var SVGFEBlendElement: {
    prototype: SVGFEBlendElement;
    new(): SVGFEBlendElement;
    readonly SVG_FEBLEND_MODE_COLOR: number;
    readonly SVG_FEBLEND_MODE_COLOR_BURN: number;
    readonly SVG_FEBLEND_MODE_COLOR_DODGE: number;
    readonly SVG_FEBLEND_MODE_DARKEN: number;
    readonly SVG_FEBLEND_MODE_DIFFERENCE: number;
    readonly SVG_FEBLEND_MODE_EXCLUSION: number;
    readonly SVG_FEBLEND_MODE_HARD_LIGHT: number;
    readonly SVG_FEBLEND_MODE_HUE: number;
    readonly SVG_FEBLEND_MODE_LIGHTEN: number;
    readonly SVG_FEBLEND_MODE_LUMINOSITY: number;
    readonly SVG_FEBLEND_MODE_MULTIPLY: number;
    readonly SVG_FEBLEND_MODE_NORMAL: number;
    readonly SVG_FEBLEND_MODE_OVERLAY: number;
    readonly SVG_FEBLEND_MODE_SATURATION: number;
    readonly SVG_FEBLEND_MODE_SCREEN: number;
    readonly SVG_FEBLEND_MODE_SOFT_LIGHT: number;
    readonly SVG_FEBLEND_MODE_UNKNOWN: number;
};

interface SVGFEColorMatrixElement extends SVGElement, SVGFilterPrimitiveStandardAttributes {
    /*! @ooml-mapto(addEventListener) */ addSVGFEColorMatrixElementEventListener<T extends SVGElementEventType>(type: __Class<T>, listener: EventListener<SVGFEColorMatrixElement, T>, options?: boolean | AddEventListenerOptions): void;
    /*! @ooml-mapto(removeEventListener) */ removeSVGFEColorMatrixElementEventListener<T extends SVGElementEventType>(type: __Class<T>, listener: EventListener<SVGFEColorMatrixElement, T>, options?: boolean | EventListenerOptions): void;
    readonly in1: SVGAnimatedString;
    readonly type: SVGAnimatedEnumeration;
    readonly values: SVGAnimatedNumberList;
}

declare var SVGFEColorMatrixElement: {
    prototype: SVGFEColorMatrixElement;
    new(): SVGFEColorMatrixElement;
    readonly SVG_FECOLORMATRIX_TYPE_HUEROTATE: number;
    readonly SVG_FECOLORMATRIX_TYPE_LUMINANCETOALPHA: number;
    readonly SVG_FECOLORMATRIX_TYPE_MATRIX: number;
    readonly SVG_FECOLORMATRIX_TYPE_SATURATE: number;
    readonly SVG_FECOLORMATRIX_TYPE_UNKNOWN: number;
};

interface SVGFEComponentTransferElement extends SVGElement, SVGFilterPrimitiveStandardAttributes {
    /*! @ooml-mapto(addEventListener) */ addSVGFEComponentTransferElementEventListener<T extends SVGElementEventType>(type: __Class<T>, listener: EventListener<SVGFEComponentTransferElement, T>, options?: boolean | AddEventListenerOptions): void;
    /*! @ooml-mapto(removeEventListener) */ removeSVGFEComponentTransferElementEventListener<T extends SVGElementEventType>(type: __Class<T>, listener: EventListener<SVGFEComponentTransferElement, T>, options?: boolean | EventListenerOptions): void;
    readonly in1: SVGAnimatedString;
}

declare var SVGFEComponentTransferElement: {
    prototype: SVGFEComponentTransferElement;
    new(): SVGFEComponentTransferElement;
};

interface SVGFECompositeElement extends SVGElement, SVGFilterPrimitiveStandardAttributes {
    /*! @ooml-mapto(addEventListener) */ addSVGFECompositeElementEventListener<T extends SVGElementEventType>(type: __Class<T>, listener: EventListener<SVGFECompositeElement, T>, options?: boolean | AddEventListenerOptions): void;
    /*! @ooml-mapto(removeEventListener) */ removeSVGFECompositeElementEventListener<T extends SVGElementEventType>(type: __Class<T>, listener: EventListener<SVGFECompositeElement, T>, options?: boolean | EventListenerOptions): void;
    readonly in1: SVGAnimatedString;
    readonly in2: SVGAnimatedString;
    readonly k1: SVGAnimatedNumber;
    readonly k2: SVGAnimatedNumber;
    readonly k3: SVGAnimatedNumber;
    readonly k4: SVGAnimatedNumber;
    readonly operator: SVGAnimatedEnumeration;
}

declare var SVGFECompositeElement: {
    prototype: SVGFECompositeElement;
    new(): SVGFECompositeElement;
    readonly SVG_FECOMPOSITE_OPERATOR_ARITHMETIC: number;
    readonly SVG_FECOMPOSITE_OPERATOR_ATOP: number;
    readonly SVG_FECOMPOSITE_OPERATOR_IN: number;
    readonly SVG_FECOMPOSITE_OPERATOR_OUT: number;
    readonly SVG_FECOMPOSITE_OPERATOR_OVER: number;
    readonly SVG_FECOMPOSITE_OPERATOR_UNKNOWN: number;
    readonly SVG_FECOMPOSITE_OPERATOR_XOR: number;
};

interface SVGFEConvolveMatrixElement extends SVGElement, SVGFilterPrimitiveStandardAttributes {
    /*! @ooml-mapto(addEventListener) */ addSVGFEConvolveMatrixElementEventListener<T extends SVGElementEventType>(type: __Class<T>, listener: EventListener<SVGFEConvolveMatrixElement, T>, options?: boolean | AddEventListenerOptions): void;
    /*! @ooml-mapto(removeEventListener) */ removeSVGFEConvolveMatrixElementEventListener<T extends SVGElementEventType>(type: __Class<T>, listener: EventListener<SVGFEConvolveMatrixElement, T>, options?: boolean | EventListenerOptions): void;
    readonly bias: SVGAnimatedNumber;
    readonly divisor: SVGAnimatedNumber;
    readonly edgeMode: SVGAnimatedEnumeration;
    readonly in1: SVGAnimatedString;
    readonly kernelMatrix: SVGAnimatedNumberList;
    readonly kernelUnitLengthX: SVGAnimatedNumber;
    readonly kernelUnitLengthY: SVGAnimatedNumber;
    readonly orderX: SVGAnimatedInteger;
    readonly orderY: SVGAnimatedInteger;
    readonly preserveAlpha: SVGAnimatedBoolean;
    readonly targetX: SVGAnimatedInteger;
    readonly targetY: SVGAnimatedInteger;
}

declare var SVGFEConvolveMatrixElement: {
    prototype: SVGFEConvolveMatrixElement;
    new(): SVGFEConvolveMatrixElement;
    readonly SVG_EDGEMODE_DUPLICATE: number;
    readonly SVG_EDGEMODE_NONE: number;
    readonly SVG_EDGEMODE_UNKNOWN: number;
    readonly SVG_EDGEMODE_WRAP: number;
};

interface SVGFEDiffuseLightingElement extends SVGElement, SVGFilterPrimitiveStandardAttributes {
    /*! @ooml-mapto(addEventListener) */ addSVGFEDiffuseLightingElementEventListener<T extends SVGElementEventType>(type: __Class<T>, listener: EventListener<SVGFEDiffuseLightingElement, T>, options?: boolean | AddEventListenerOptions): void;
    /*! @ooml-mapto(removeEventListener) */ removeSVGFEDiffuseLightingElementEventListener<T extends SVGElementEventType>(type: __Class<T>, listener: EventListener<SVGFEDiffuseLightingElement, T>, options?: boolean | EventListenerOptions): void;
    readonly diffuseConstant: SVGAnimatedNumber;
    readonly in1: SVGAnimatedString;
    readonly kernelUnitLengthX: SVGAnimatedNumber;
    readonly kernelUnitLengthY: SVGAnimatedNumber;
    readonly surfaceScale: SVGAnimatedNumber;
}

declare var SVGFEDiffuseLightingElement: {
    prototype: SVGFEDiffuseLightingElement;
    new(): SVGFEDiffuseLightingElement;
};

interface SVGFEDisplacementMapElement extends SVGElement, SVGFilterPrimitiveStandardAttributes {
    /*! @ooml-mapto(addEventListener) */ addSVGFEDisplacementMapElementEventListener<T extends SVGElementEventType>(type: __Class<T>, listener: EventListener<SVGFEDisplacementMapElement, T>, options?: boolean | AddEventListenerOptions): void;
    /*! @ooml-mapto(removeEventListener) */ removeSVGFEDisplacementMapElementEventListener<T extends SVGElementEventType>(type: __Class<T>, listener: EventListener<SVGFEDisplacementMapElement, T>, options?: boolean | EventListenerOptions): void;
    readonly in1: SVGAnimatedString;
    readonly in2: SVGAnimatedString;
    readonly scale: SVGAnimatedNumber;
    readonly xChannelSelector: SVGAnimatedEnumeration;
    readonly yChannelSelector: SVGAnimatedEnumeration;
}

declare var SVGFEDisplacementMapElement: {
    prototype: SVGFEDisplacementMapElement;
    new(): SVGFEDisplacementMapElement;
    readonly SVG_CHANNEL_A: number;
    readonly SVG_CHANNEL_B: number;
    readonly SVG_CHANNEL_G: number;
    readonly SVG_CHANNEL_R: number;
    readonly SVG_CHANNEL_UNKNOWN: number;
};

interface SVGFEDistantLightElement extends SVGElement {
    /*! @ooml-mapto(addEventListener) */ addSVGFEDistantLightElementEventListener<T extends SVGElementEventType>(type: __Class<T>, listener: EventListener<SVGFEDistantLightElement, T>, options?: boolean | AddEventListenerOptions): void;
    /*! @ooml-mapto(removeEventListener) */ removeSVGFEDistantLightElementEventListener<T extends SVGElementEventType>(type: __Class<T>, listener: EventListener<SVGFEDistantLightElement, T>, options?: boolean | EventListenerOptions): void;
    readonly azimuth: SVGAnimatedNumber;
    readonly elevation: SVGAnimatedNumber;
}

declare var SVGFEDistantLightElement: {
    prototype: SVGFEDistantLightElement;
    new(): SVGFEDistantLightElement;
};

interface SVGFEFloodElement extends SVGElement, SVGFilterPrimitiveStandardAttributes {
    /*! @ooml-mapto(addEventListener) */ addSVGFEFloodElementEventListener<T extends SVGElementEventType>(type: __Class<T>, listener: EventListener<SVGFEFloodElement, T>, options?: boolean | AddEventListenerOptions): void;
    /*! @ooml-mapto(removeEventListener) */ removeSVGFEFloodElementEventListener<T extends SVGElementEventType>(type: __Class<T>, listener: EventListener<SVGFEFloodElement, T>, options?: boolean | EventListenerOptions): void;
}

declare var SVGFEFloodElement: {
    prototype: SVGFEFloodElement;
    new(): SVGFEFloodElement;
};

interface SVGFEFuncAElement extends SVGComponentTransferFunctionElement {
    /*! @ooml-mapto(addEventListener) */ addSVGFEFuncAElementEventListener<T extends SVGElementEventType>(type: __Class<T>, listener: EventListener<SVGFEFuncAElement, T>, options?: boolean | AddEventListenerOptions): void;
    /*! @ooml-mapto(removeEventListener) */ removeSVGFEFuncAElementEventListener<T extends SVGElementEventType>(type: __Class<T>, listener: EventListener<SVGFEFuncAElement, T>, options?: boolean | EventListenerOptions): void;
}

declare var SVGFEFuncAElement: {
    prototype: SVGFEFuncAElement;
    new(): SVGFEFuncAElement;
};

interface SVGFEFuncBElement extends SVGComponentTransferFunctionElement {
    /*! @ooml-mapto(addEventListener) */ addSVGFEFuncBElementEventListener<T extends SVGElementEventType>(type: __Class<T>, listener: EventListener<SVGFEFuncBElement, T>, options?: boolean | AddEventListenerOptions): void;
    /*! @ooml-mapto(removeEventListener) */ removeSVGFEFuncBElementEventListener<T extends SVGElementEventType>(type: __Class<T>, listener: EventListener<SVGFEFuncBElement, T>, options?: boolean | EventListenerOptions): void;
}

declare var SVGFEFuncBElement: {
    prototype: SVGFEFuncBElement;
    new(): SVGFEFuncBElement;
};

interface SVGFEFuncGElement extends SVGComponentTransferFunctionElement {
    /*! @ooml-mapto(addEventListener) */ addSVGFEFuncGElementEventListener<T extends SVGElementEventType>(type: __Class<T>, listener: EventListener<SVGFEFuncGElement, T>, options?: boolean | AddEventListenerOptions): void;
    /*! @ooml-mapto(removeEventListener) */ removeSVGFEFuncGElementEventListener<T extends SVGElementEventType>(type: __Class<T>, listener: EventListener<SVGFEFuncGElement, T>, options?: boolean | EventListenerOptions): void;
}

declare var SVGFEFuncGElement: {
    prototype: SVGFEFuncGElement;
    new(): SVGFEFuncGElement;
};

interface SVGFEFuncRElement extends SVGComponentTransferFunctionElement {
    /*! @ooml-mapto(addEventListener) */ addSVGFEFuncRElementEventListener<T extends SVGElementEventType>(type: __Class<T>, listener: EventListener<SVGFEFuncRElement, T>, options?: boolean | AddEventListenerOptions): void;
    /*! @ooml-mapto(removeEventListener) */ removeSVGFEFuncRElementEventListener<T extends SVGElementEventType>(type: __Class<T>, listener: EventListener<SVGFEFuncRElement, T>, options?: boolean | EventListenerOptions): void;
}

declare var SVGFEFuncRElement: {
    prototype: SVGFEFuncRElement;
    new(): SVGFEFuncRElement;
};

interface SVGFEGaussianBlurElement extends SVGElement, SVGFilterPrimitiveStandardAttributes {
    /*! @ooml-mapto(addEventListener) */ addSVGFEGaussianBlurElementEventListener<T extends SVGElementEventType>(type: __Class<T>, listener: EventListener<SVGFEGaussianBlurElement, T>, options?: boolean | AddEventListenerOptions): void;
    /*! @ooml-mapto(removeEventListener) */ removeSVGFEGaussianBlurElementEventListener<T extends SVGElementEventType>(type: __Class<T>, listener: EventListener<SVGFEGaussianBlurElement, T>, options?: boolean | EventListenerOptions): void;
    readonly in1: SVGAnimatedString;
    readonly stdDeviationX: SVGAnimatedNumber;
    readonly stdDeviationY: SVGAnimatedNumber;
    setStdDeviation(stdDeviationX: number, stdDeviationY: number): void;
}

declare var SVGFEGaussianBlurElement: {
    prototype: SVGFEGaussianBlurElement;
    new(): SVGFEGaussianBlurElement;
};

interface SVGFEImageElement extends SVGElement, SVGFilterPrimitiveStandardAttributes, SVGURIReference {
    /*! @ooml-mapto(addEventListener) */ addSVGFEImageElementEventListener<T extends SVGElementEventType>(type: __Class<T>, listener: EventListener<SVGFEImageElement, T>, options?: boolean | AddEventListenerOptions): void;
    /*! @ooml-mapto(removeEventListener) */ removeSVGFEImageElementEventListener<T extends SVGElementEventType>(type: __Class<T>, listener: EventListener<SVGFEImageElement, T>, options?: boolean | EventListenerOptions): void;
    readonly preserveAspectRatio: SVGAnimatedPreserveAspectRatio;
}

declare var SVGFEImageElement: {
    prototype: SVGFEImageElement;
    new(): SVGFEImageElement;
};

interface SVGFEMergeElement extends SVGElement, SVGFilterPrimitiveStandardAttributes {
    /*! @ooml-mapto(addEventListener) */ addSVGFEMergeElementEventListener<T extends SVGElementEventType>(type: __Class<T>, listener: EventListener<SVGFEMergeElement, T>, options?: boolean | AddEventListenerOptions): void;
    /*! @ooml-mapto(removeEventListener) */ removeSVGFEMergeElementEventListener<T extends SVGElementEventType>(type: __Class<T>, listener: EventListener<SVGFEMergeElement, T>, options?: boolean | EventListenerOptions): void;
}

declare var SVGFEMergeElement: {
    prototype: SVGFEMergeElement;
    new(): SVGFEMergeElement;
};

interface SVGFEMergeNodeElement extends SVGElement {
    /*! @ooml-mapto(addEventListener) */ addSVGFEMergeNodeElementEventListener<T extends SVGElementEventType>(type: __Class<T>, listener: EventListener<SVGFEMergeNodeElement, T>, options?: boolean | AddEventListenerOptions): void;
    /*! @ooml-mapto(removeEventListener) */ removeSVGFEMergeNodeElementEventListener<T extends SVGElementEventType>(type: __Class<T>, listener: EventListener<SVGFEMergeNodeElement, T>, options?: boolean | EventListenerOptions): void;
    readonly in1: SVGAnimatedString;
}

declare var SVGFEMergeNodeElement: {
    prototype: SVGFEMergeNodeElement;
    new(): SVGFEMergeNodeElement;
};

interface SVGFEMorphologyElement extends SVGElement, SVGFilterPrimitiveStandardAttributes {
    /*! @ooml-mapto(addEventListener) */ addSVGFEMorphologyElementEventListener<T extends SVGElementEventType>(type: __Class<T>, listener: EventListener<SVGFEMorphologyElement, T>, options?: boolean | AddEventListenerOptions): void;
    /*! @ooml-mapto(removeEventListener) */ removeSVGFEMorphologyElementEventListener<T extends SVGElementEventType>(type: __Class<T>, listener: EventListener<SVGFEMorphologyElement, T>, options?: boolean | EventListenerOptions): void;
    readonly in1: SVGAnimatedString;
    readonly operator: SVGAnimatedEnumeration;
    readonly radiusX: SVGAnimatedNumber;
    readonly radiusY: SVGAnimatedNumber;
}

declare var SVGFEMorphologyElement: {
    prototype: SVGFEMorphologyElement;
    new(): SVGFEMorphologyElement;
    readonly SVG_MORPHOLOGY_OPERATOR_DILATE: number;
    readonly SVG_MORPHOLOGY_OPERATOR_ERODE: number;
    readonly SVG_MORPHOLOGY_OPERATOR_UNKNOWN: number;
};

interface SVGFEOffsetElement extends SVGElement, SVGFilterPrimitiveStandardAttributes {
    /*! @ooml-mapto(addEventListener) */ addSVGFEOffsetElementEventListener<T extends SVGElementEventType>(type: __Class<T>, listener: EventListener<SVGFEOffsetElement, T>, options?: boolean | AddEventListenerOptions): void;
    /*! @ooml-mapto(removeEventListener) */ removeSVGFEOffsetElementEventListener<T extends SVGElementEventType>(type: __Class<T>, listener: EventListener<SVGFEOffsetElement, T>, options?: boolean | EventListenerOptions): void;
    readonly dx: SVGAnimatedNumber;
    readonly dy: SVGAnimatedNumber;
    readonly in1: SVGAnimatedString;
}

declare var SVGFEOffsetElement: {
    prototype: SVGFEOffsetElement;
    new(): SVGFEOffsetElement;
};

interface SVGFEPointLightElement extends SVGElement {
    /*! @ooml-mapto(addEventListener) */ addSVGFEPointLightElementEventListener<T extends SVGElementEventType>(type: __Class<T>, listener: EventListener<SVGFEPointLightElement, T>, options?: boolean | AddEventListenerOptions): void;
    /*! @ooml-mapto(removeEventListener) */ removeSVGFEPointLightElementEventListener<T extends SVGElementEventType>(type: __Class<T>, listener: EventListener<SVGFEPointLightElement, T>, options?: boolean | EventListenerOptions): void;
    readonly x: SVGAnimatedNumber;
    readonly y: SVGAnimatedNumber;
    readonly z: SVGAnimatedNumber;
}

declare var SVGFEPointLightElement: {
    prototype: SVGFEPointLightElement;
    new(): SVGFEPointLightElement;
};

interface SVGFESpecularLightingElement extends SVGElement, SVGFilterPrimitiveStandardAttributes {
    /*! @ooml-mapto(addEventListener) */ addSVGFESpecularLightingElementEventListener<T extends SVGElementEventType>(type: __Class<T>, listener: EventListener<SVGFESpecularLightingElement, T>, options?: boolean | AddEventListenerOptions): void;
    /*! @ooml-mapto(removeEventListener) */ removeSVGFESpecularLightingElementEventListener<T extends SVGElementEventType>(type: __Class<T>, listener: EventListener<SVGFESpecularLightingElement, T>, options?: boolean | EventListenerOptions): void;
    readonly in1: SVGAnimatedString;
    readonly kernelUnitLengthX: SVGAnimatedNumber;
    readonly kernelUnitLengthY: SVGAnimatedNumber;
    readonly specularConstant: SVGAnimatedNumber;
    readonly specularExponent: SVGAnimatedNumber;
    readonly surfaceScale: SVGAnimatedNumber;
}

declare var SVGFESpecularLightingElement: {
    prototype: SVGFESpecularLightingElement;
    new(): SVGFESpecularLightingElement;
};

interface SVGFESpotLightElement extends SVGElement {
    /*! @ooml-mapto(addEventListener) */ addSVGFESpotLightElementEventListener<T extends SVGElementEventType>(type: __Class<T>, listener: EventListener<SVGFESpotLightElement, T>, options?: boolean | AddEventListenerOptions): void;
    /*! @ooml-mapto(removeEventListener) */ removeSVGFESpotLightElementEventListener<T extends SVGElementEventType>(type: __Class<T>, listener: EventListener<SVGFESpotLightElement, T>, options?: boolean | EventListenerOptions): void;
    readonly limitingConeAngle: SVGAnimatedNumber;
    readonly pointsAtX: SVGAnimatedNumber;
    readonly pointsAtY: SVGAnimatedNumber;
    readonly pointsAtZ: SVGAnimatedNumber;
    readonly specularExponent: SVGAnimatedNumber;
    readonly x: SVGAnimatedNumber;
    readonly y: SVGAnimatedNumber;
    readonly z: SVGAnimatedNumber;
}

declare var SVGFESpotLightElement: {
    prototype: SVGFESpotLightElement;
    new(): SVGFESpotLightElement;
};

interface SVGFETileElement extends SVGElement, SVGFilterPrimitiveStandardAttributes {
    /*! @ooml-mapto(addEventListener) */ addSVGFETileElementEventListener<T extends SVGElementEventType>(type: __Class<T>, listener: EventListener<SVGFETileElement, T>, options?: boolean | AddEventListenerOptions): void;
    /*! @ooml-mapto(removeEventListener) */ removeSVGFETileElementEventListener<T extends SVGElementEventType>(type: __Class<T>, listener: EventListener<SVGFETileElement, T>, options?: boolean | EventListenerOptions): void;
    readonly in1: SVGAnimatedString;
}

declare var SVGFETileElement: {
    prototype: SVGFETileElement;
    new(): SVGFETileElement;
};

interface SVGFETurbulenceElement extends SVGElement, SVGFilterPrimitiveStandardAttributes {
    /*! @ooml-mapto(addEventListener) */ addSVGFETurbulenceElementEventListener<T extends SVGElementEventType>(type: __Class<T>, listener: EventListener<SVGFETurbulenceElement, T>, options?: boolean | AddEventListenerOptions): void;
    /*! @ooml-mapto(removeEventListener) */ removeSVGFETurbulenceElementEventListener<T extends SVGElementEventType>(type: __Class<T>, listener: EventListener<SVGFETurbulenceElement, T>, options?: boolean | EventListenerOptions): void;
    readonly baseFrequencyX: SVGAnimatedNumber;
    readonly baseFrequencyY: SVGAnimatedNumber;
    readonly numOctaves: SVGAnimatedInteger;
    readonly seed: SVGAnimatedNumber;
    readonly stitchTiles: SVGAnimatedEnumeration;
    readonly type: SVGAnimatedEnumeration;
}

declare var SVGFETurbulenceElement: {
    prototype: SVGFETurbulenceElement;
    new(): SVGFETurbulenceElement;
    readonly SVG_STITCHTYPE_NOSTITCH: number;
    readonly SVG_STITCHTYPE_STITCH: number;
    readonly SVG_STITCHTYPE_UNKNOWN: number;
    readonly SVG_TURBULENCE_TYPE_FRACTALNOISE: number;
    readonly SVG_TURBULENCE_TYPE_TURBULENCE: number;
    readonly SVG_TURBULENCE_TYPE_UNKNOWN: number;
};

interface SVGFilterElement extends SVGElement, SVGURIReference {
    /*! @ooml-mapto(addEventListener) */ addSVGFilterElementEventListener<T extends SVGElementEventType>(type: __Class<T>, listener: EventListener<SVGFilterElement, T>, options?: boolean | AddEventListenerOptions): void;
    /*! @ooml-mapto(removeEventListener) */ removeSVGFilterElementEventListener<T extends SVGElementEventType>(type: __Class<T>, listener: EventListener<SVGFilterElement, T>, options?: boolean | EventListenerOptions): void;
    /** @deprecated */
    readonly filterResX: SVGAnimatedInteger;
    /** @deprecated */
    readonly filterResY: SVGAnimatedInteger;
    readonly filterUnits: SVGAnimatedEnumeration;
    readonly height: SVGAnimatedLength;
    readonly primitiveUnits: SVGAnimatedEnumeration;
    readonly width: SVGAnimatedLength;
    readonly x: SVGAnimatedLength;
    readonly y: SVGAnimatedLength;
    /** @deprecated */
    setFilterRes(filterResX: number, filterResY: number): void;
}

declare var SVGFilterElement: {
    prototype: SVGFilterElement;
    new(): SVGFilterElement;
};

interface SVGFilterPrimitiveStandardAttributes /*! @ooml-interface */ {
    readonly height: SVGAnimatedLength;
    readonly result: SVGAnimatedString;
    readonly width: SVGAnimatedLength;
    readonly x: SVGAnimatedLength;
    readonly y: SVGAnimatedLength;
}

interface SVGFitToViewBox /*! @ooml-interface */ {
    readonly preserveAspectRatio: SVGAnimatedPreserveAspectRatio;
    readonly viewBox: SVGAnimatedRect;
}

interface SVGForeignObjectElement extends SVGGraphicsElement {
    /*! @ooml-mapto(addEventListener) */ addSVGForeignObjectElementEventListener<T extends SVGElementEventType>(type: __Class<T>, listener: EventListener<SVGForeignObjectElement, T>, options?: boolean | AddEventListenerOptions): void;
    /*! @ooml-mapto(removeEventListener) */ removeSVGForeignObjectElementEventListener<T extends SVGElementEventType>(type: __Class<T>, listener: EventListener<SVGForeignObjectElement, T>, options?: boolean | EventListenerOptions): void;
    readonly height: SVGAnimatedLength;
    readonly width: SVGAnimatedLength;
    readonly x: SVGAnimatedLength;
    readonly y: SVGAnimatedLength;
}

declare var SVGForeignObjectElement: {
    prototype: SVGForeignObjectElement;
    new(): SVGForeignObjectElement;
};

interface SVGGElement extends SVGGraphicsElement {
    /*! @ooml-mapto(addEventListener) */ addSVGGElementEventListener<T extends SVGElementEventType>(type: __Class<T>, listener: EventListener<SVGGElement, T>, options?: boolean | AddEventListenerOptions): void;
    /*! @ooml-mapto(removeEventListener) */ removeSVGGElementEventListener<T extends SVGElementEventType>(type: __Class<T>, listener: EventListener<SVGGElement, T>, options?: boolean | EventListenerOptions): void;
}

declare var SVGGElement: {
    prototype: SVGGElement;
    new(): SVGGElement;
};

interface SVGGradientElement extends SVGElement, SVGURIReference {
    /*! @ooml-mapto(addEventListener) */ addSVGGradientElementEventListener<T extends SVGElementEventType>(type: __Class<T>, listener: EventListener<SVGGradientElement, T>, options?: boolean | AddEventListenerOptions): void;
    /*! @ooml-mapto(removeEventListener) */ removeSVGGradientElementEventListener<T extends SVGElementEventType>(type: __Class<T>, listener: EventListener<SVGGradientElement, T>, options?: boolean | EventListenerOptions): void;
    readonly gradientTransform: SVGAnimatedTransformList;
    readonly gradientUnits: SVGAnimatedEnumeration;
    readonly spreadMethod: SVGAnimatedEnumeration;
}

declare var SVGGradientElement: {
    prototype: SVGGradientElement;
    new(): SVGGradientElement;
    readonly SVG_SPREADMETHOD_PAD: number;
    readonly SVG_SPREADMETHOD_REFLECT: number;
    readonly SVG_SPREADMETHOD_REPEAT: number;
    readonly SVG_SPREADMETHOD_UNKNOWN: number;
};

interface SVGGraphicsElement extends SVGElement, SVGTests {
    /*! @ooml-mapto(addEventListener) */ addSVGGraphicsElementEventListener<T extends SVGElementEventType>(type: __Class<T>, listener: EventListener<SVGGraphicsElement, T>, options?: boolean | AddEventListenerOptions): void;
    /*! @ooml-mapto(removeEventListener) */ removeSVGGraphicsElementEventListener<T extends SVGElementEventType>(type: __Class<T>, listener: EventListener<SVGGraphicsElement, T>, options?: boolean | EventListenerOptions): void;
    /** @deprecated */
    readonly farthestViewportElement: SVGElement | null;
    /** @deprecated */
    readonly nearestViewportElement: SVGElement | null;
    readonly transform: SVGAnimatedTransformList;
    getBBox(): SVGRect;
    getCTM(): SVGMatrix | null;
    getScreenCTM(): SVGMatrix | null;
    /** @deprecated */
    getTransformToElement(element: SVGElement): SVGMatrix;
}

declare var SVGGraphicsElement: {
    prototype: SVGGraphicsElement;
    new(): SVGGraphicsElement;
};

interface SVGImageElement extends SVGGraphicsElement, SVGURIReference {
    /*! @ooml-mapto(addEventListener) */ addSVGImageElementEventListener<T extends SVGElementEventType>(type: __Class<T>, listener: EventListener<SVGImageElement, T>, options?: boolean | AddEventListenerOptions): void;
    /*! @ooml-mapto(removeEventListener) */ removeSVGImageElementEventListener<T extends SVGElementEventType>(type: __Class<T>, listener: EventListener<SVGImageElement, T>, options?: boolean | EventListenerOptions): void;
    readonly height: SVGAnimatedLength;
    readonly preserveAspectRatio: SVGAnimatedPreserveAspectRatio;
    readonly width: SVGAnimatedLength;
    readonly x: SVGAnimatedLength;
    readonly y: SVGAnimatedLength;
}

declare var SVGImageElement: {
    prototype: SVGImageElement;
    new(): SVGImageElement;
};

interface SVGLength {
    readonly unitType: number;
    value: number;
    valueAsString: string;
    valueInSpecifiedUnits: number;
    convertToSpecifiedUnits(unitType: number): void;
    newValueSpecifiedUnits(unitType: number, valueInSpecifiedUnits: number): void;
}

declare var SVGLength: {
    prototype: SVGLength;
    new(): SVGLength;
    readonly SVG_LENGTHTYPE_CM: number;
    readonly SVG_LENGTHTYPE_EMS: number;
    readonly SVG_LENGTHTYPE_EXS: number;
    readonly SVG_LENGTHTYPE_IN: number;
    readonly SVG_LENGTHTYPE_MM: number;
    readonly SVG_LENGTHTYPE_NUMBER: number;
    readonly SVG_LENGTHTYPE_PC: number;
    readonly SVG_LENGTHTYPE_PERCENTAGE: number;
    readonly SVG_LENGTHTYPE_PT: number;
    readonly SVG_LENGTHTYPE_PX: number;
    readonly SVG_LENGTHTYPE_UNKNOWN: number;
};

interface SVGLengthList {
    readonly numberOfItems: number;
    appendItem(newItem: SVGLength): SVGLength;
    clear(): void;
    getItem(index: number): SVGLength;
    initialize(newItem: SVGLength): SVGLength;
    insertItemBefore(newItem: SVGLength, index: number): SVGLength;
    removeItem(index: number): SVGLength;
    replaceItem(newItem: SVGLength, index: number): SVGLength;
}

declare var SVGLengthList: {
    prototype: SVGLengthList;
    new(): SVGLengthList;
};

interface SVGLineElement extends SVGGraphicsElement {
    /*! @ooml-mapto(addEventListener) */ addSVGLineElementEventListener<T extends SVGElementEventType>(type: __Class<T>, listener: EventListener<SVGLineElement, T>, options?: boolean | AddEventListenerOptions): void;
    /*! @ooml-mapto(removeEventListener) */ removeSVGLineElementEventListener<T extends SVGElementEventType>(type: __Class<T>, listener: EventListener<SVGLineElement, T>, options?: boolean | EventListenerOptions): void;
    readonly x1: SVGAnimatedLength;
    readonly x2: SVGAnimatedLength;
    readonly y1: SVGAnimatedLength;
    readonly y2: SVGAnimatedLength;
}

declare var SVGLineElement: {
    prototype: SVGLineElement;
    new(): SVGLineElement;
};

interface SVGLinearGradientElement extends SVGGradientElement {
    /*! @ooml-mapto(addEventListener) */ addSVGLinearGradientElementEventListener<T extends SVGElementEventType>(type: __Class<T>, listener: EventListener<SVGLinearGradientElement, T>, options?: boolean | AddEventListenerOptions): void;
    /*! @ooml-mapto(removeEventListener) */ removeSVGLinearGradientElementEventListener<T extends SVGElementEventType>(type: __Class<T>, listener: EventListener<SVGLinearGradientElement, T>, options?: boolean | EventListenerOptions): void;
    readonly x1: SVGAnimatedLength;
    readonly x2: SVGAnimatedLength;
    readonly y1: SVGAnimatedLength;
    readonly y2: SVGAnimatedLength;
}

declare var SVGLinearGradientElement: {
    prototype: SVGLinearGradientElement;
    new(): SVGLinearGradientElement;
};

interface SVGMarkerElement extends SVGElement, SVGFitToViewBox {
    /*! @ooml-mapto(addEventListener) */ addSVGMarkerElementEventListener<T extends SVGElementEventType>(type: __Class<T>, listener: EventListener<SVGMarkerElement, T>, options?: boolean | AddEventListenerOptions): void;
    /*! @ooml-mapto(removeEventListener) */ removeSVGMarkerElementEventListener<T extends SVGElementEventType>(type: __Class<T>, listener: EventListener<SVGMarkerElement, T>, options?: boolean | EventListenerOptions): void;
    readonly markerHeight: SVGAnimatedLength;
    readonly markerUnits: SVGAnimatedEnumeration;
    readonly markerWidth: SVGAnimatedLength;
    readonly orientAngle: SVGAnimatedAngle;
    readonly orientType: SVGAnimatedEnumeration;
    readonly refX: SVGAnimatedLength;
    readonly refY: SVGAnimatedLength;
    setOrientToAngle(angle: SVGAngle): void;
    setOrientToAuto(): void;
}

declare var SVGMarkerElement: {
    prototype: SVGMarkerElement;
    new(): SVGMarkerElement;
    readonly SVG_MARKERUNITS_STROKEWIDTH: number;
    readonly SVG_MARKERUNITS_UNKNOWN: number;
    readonly SVG_MARKERUNITS_USERSPACEONUSE: number;
    readonly SVG_MARKER_ORIENT_ANGLE: number;
    readonly SVG_MARKER_ORIENT_AUTO: number;
    readonly SVG_MARKER_ORIENT_UNKNOWN: number;
};

interface SVGMaskElement extends SVGElement, SVGTests {
    /*! @ooml-mapto(addEventListener) */ addSVGMaskElementEventListener<T extends SVGElementEventType>(type: __Class<T>, listener: EventListener<SVGMaskElement, T>, options?: boolean | AddEventListenerOptions): void;
    /*! @ooml-mapto(removeEventListener) */ removeSVGMaskElementEventListener<T extends SVGElementEventType>(type: __Class<T>, listener: EventListener<SVGMaskElement, T>, options?: boolean | EventListenerOptions): void;
    readonly height: SVGAnimatedLength;
    readonly maskContentUnits: SVGAnimatedEnumeration;
    readonly maskUnits: SVGAnimatedEnumeration;
    readonly width: SVGAnimatedLength;
    readonly x: SVGAnimatedLength;
    readonly y: SVGAnimatedLength;
}

declare var SVGMaskElement: {
    prototype: SVGMaskElement;
    new(): SVGMaskElement;
};

interface SVGMatrix {
    a: number;
    b: number;
    c: number;
    d: number;
    e: number;
    f: number;
    flipX(): SVGMatrix;
    flipY(): SVGMatrix;
    inverse(): SVGMatrix;
    multiply(secondMatrix: SVGMatrix): SVGMatrix;
    rotate(angle: number): SVGMatrix;
    rotateFromVector(x: number, y: number): SVGMatrix;
    scale(scaleFactor: number): SVGMatrix;
    scaleNonUniform(scaleFactorX: number, scaleFactorY: number): SVGMatrix;
    skewX(angle: number): SVGMatrix;
    skewY(angle: number): SVGMatrix;
    translate(x: number, y: number): SVGMatrix;
}

declare var SVGMatrix: {
    prototype: SVGMatrix;
    new(): SVGMatrix;
};

interface SVGMetadataElement extends SVGElement {
    /*! @ooml-mapto(addEventListener) */ addSVGMetadataElementEventListener<T extends SVGElementEventType>(type: __Class<T>, listener: EventListener<SVGMetadataElement, T>, options?: boolean | AddEventListenerOptions): void;
    /*! @ooml-mapto(removeEventListener) */ removeSVGMetadataElementEventListener<T extends SVGElementEventType>(type: __Class<T>, listener: EventListener<SVGMetadataElement, T>, options?: boolean | EventListenerOptions): void;
}

declare var SVGMetadataElement: {
    prototype: SVGMetadataElement;
    new(): SVGMetadataElement;
};

interface SVGNumber {
    value: number;
}

declare var SVGNumber: {
    prototype: SVGNumber;
    new(): SVGNumber;
};

interface SVGNumberList {
    readonly numberOfItems: number;
    appendItem(newItem: SVGNumber): SVGNumber;
    clear(): void;
    getItem(index: number): SVGNumber;
    initialize(newItem: SVGNumber): SVGNumber;
    insertItemBefore(newItem: SVGNumber, index: number): SVGNumber;
    removeItem(index: number): SVGNumber;
    replaceItem(newItem: SVGNumber, index: number): SVGNumber;
}

declare var SVGNumberList: {
    prototype: SVGNumberList;
    new(): SVGNumberList;
};

interface SVGPathElement extends SVGGraphicsElement {
    /*! @ooml-mapto(addEventListener) */ addSVGPathElementEventListener<T extends SVGElementEventType>(type: __Class<T>, listener: EventListener<SVGPathElement, T>, options?: boolean | AddEventListenerOptions): void;
    /*! @ooml-mapto(removeEventListener) */ removeSVGPathElementEventListener<T extends SVGElementEventType>(type: __Class<T>, listener: EventListener<SVGPathElement, T>, options?: boolean | EventListenerOptions): void;
    /** @deprecated */
    readonly pathSegList: SVGPathSegList;
    /** @deprecated */
    createSVGPathSegArcAbs(x: number, y: number, r1: number, r2: number, angle: number, largeArcFlag: boolean, sweepFlag: boolean): SVGPathSegArcAbs;
    /** @deprecated */
    createSVGPathSegArcRel(x: number, y: number, r1: number, r2: number, angle: number, largeArcFlag: boolean, sweepFlag: boolean): SVGPathSegArcRel;
    /** @deprecated */
    createSVGPathSegClosePath(): SVGPathSegClosePath;
    /** @deprecated */
    createSVGPathSegCurvetoCubicAbs(x: number, y: number, x1: number, y1: number, x2: number, y2: number): SVGPathSegCurvetoCubicAbs;
    /** @deprecated */
    createSVGPathSegCurvetoCubicRel(x: number, y: number, x1: number, y1: number, x2: number, y2: number): SVGPathSegCurvetoCubicRel;
    /** @deprecated */
    createSVGPathSegCurvetoCubicSmoothAbs(x: number, y: number, x2: number, y2: number): SVGPathSegCurvetoCubicSmoothAbs;
    /** @deprecated */
    createSVGPathSegCurvetoCubicSmoothRel(x: number, y: number, x2: number, y2: number): SVGPathSegCurvetoCubicSmoothRel;
    /** @deprecated */
    createSVGPathSegCurvetoQuadraticAbs(x: number, y: number, x1: number, y1: number): SVGPathSegCurvetoQuadraticAbs;
    /** @deprecated */
    createSVGPathSegCurvetoQuadraticRel(x: number, y: number, x1: number, y1: number): SVGPathSegCurvetoQuadraticRel;
    /** @deprecated */
    createSVGPathSegCurvetoQuadraticSmoothAbs(x: number, y: number): SVGPathSegCurvetoQuadraticSmoothAbs;
    /** @deprecated */
    createSVGPathSegCurvetoQuadraticSmoothRel(x: number, y: number): SVGPathSegCurvetoQuadraticSmoothRel;
    /** @deprecated */
    createSVGPathSegLinetoAbs(x: number, y: number): SVGPathSegLinetoAbs;
    /** @deprecated */
    createSVGPathSegLinetoHorizontalAbs(x: number): SVGPathSegLinetoHorizontalAbs;
    /** @deprecated */
    createSVGPathSegLinetoHorizontalRel(x: number): SVGPathSegLinetoHorizontalRel;
    /** @deprecated */
    createSVGPathSegLinetoRel(x: number, y: number): SVGPathSegLinetoRel;
    /** @deprecated */
    createSVGPathSegLinetoVerticalAbs(y: number): SVGPathSegLinetoVerticalAbs;
    /** @deprecated */
    createSVGPathSegLinetoVerticalRel(y: number): SVGPathSegLinetoVerticalRel;
    /** @deprecated */
    createSVGPathSegMovetoAbs(x: number, y: number): SVGPathSegMovetoAbs;
    /** @deprecated */
    createSVGPathSegMovetoRel(x: number, y: number): SVGPathSegMovetoRel;
    /** @deprecated */
    getPathSegAtLength(distance: number): number;
    getPointAtLength(distance: number): SVGPoint;
    getTotalLength(): number;
}

declare var SVGPathElement: {
    prototype: SVGPathElement;
    new(): SVGPathElement;
};

interface SVGPathSeg {
    readonly pathSegType: number;
    readonly pathSegTypeAsLetter: string;
}

declare var SVGPathSeg: {
    prototype: SVGPathSeg;
    new(): SVGPathSeg;
    readonly PATHSEG_ARC_ABS: number;
    readonly PATHSEG_ARC_REL: number;
    readonly PATHSEG_CLOSEPATH: number;
    readonly PATHSEG_CURVETO_CUBIC_ABS: number;
    readonly PATHSEG_CURVETO_CUBIC_REL: number;
    readonly PATHSEG_CURVETO_CUBIC_SMOOTH_ABS: number;
    readonly PATHSEG_CURVETO_CUBIC_SMOOTH_REL: number;
    readonly PATHSEG_CURVETO_QUADRATIC_ABS: number;
    readonly PATHSEG_CURVETO_QUADRATIC_REL: number;
    readonly PATHSEG_CURVETO_QUADRATIC_SMOOTH_ABS: number;
    readonly PATHSEG_CURVETO_QUADRATIC_SMOOTH_REL: number;
    readonly PATHSEG_LINETO_ABS: number;
    readonly PATHSEG_LINETO_HORIZONTAL_ABS: number;
    readonly PATHSEG_LINETO_HORIZONTAL_REL: number;
    readonly PATHSEG_LINETO_REL: number;
    readonly PATHSEG_LINETO_VERTICAL_ABS: number;
    readonly PATHSEG_LINETO_VERTICAL_REL: number;
    readonly PATHSEG_MOVETO_ABS: number;
    readonly PATHSEG_MOVETO_REL: number;
    readonly PATHSEG_UNKNOWN: number;
};

interface SVGPathSegArcAbs extends SVGPathSeg {
    angle: number;
    largeArcFlag: boolean;
    r1: number;
    r2: number;
    sweepFlag: boolean;
    x: number;
    y: number;
}

declare var SVGPathSegArcAbs: {
    prototype: SVGPathSegArcAbs;
    new(): SVGPathSegArcAbs;
};

interface SVGPathSegArcRel extends SVGPathSeg {
    angle: number;
    largeArcFlag: boolean;
    r1: number;
    r2: number;
    sweepFlag: boolean;
    x: number;
    y: number;
}

declare var SVGPathSegArcRel: {
    prototype: SVGPathSegArcRel;
    new(): SVGPathSegArcRel;
};

interface SVGPathSegClosePath extends SVGPathSeg {
}

declare var SVGPathSegClosePath: {
    prototype: SVGPathSegClosePath;
    new(): SVGPathSegClosePath;
};

interface SVGPathSegCurvetoCubicAbs extends SVGPathSeg {
    x: number;
    x1: number;
    x2: number;
    y: number;
    y1: number;
    y2: number;
}

declare var SVGPathSegCurvetoCubicAbs: {
    prototype: SVGPathSegCurvetoCubicAbs;
    new(): SVGPathSegCurvetoCubicAbs;
};

interface SVGPathSegCurvetoCubicRel extends SVGPathSeg {
    x: number;
    x1: number;
    x2: number;
    y: number;
    y1: number;
    y2: number;
}

declare var SVGPathSegCurvetoCubicRel: {
    prototype: SVGPathSegCurvetoCubicRel;
    new(): SVGPathSegCurvetoCubicRel;
};

interface SVGPathSegCurvetoCubicSmoothAbs extends SVGPathSeg {
    x: number;
    x2: number;
    y: number;
    y2: number;
}

declare var SVGPathSegCurvetoCubicSmoothAbs: {
    prototype: SVGPathSegCurvetoCubicSmoothAbs;
    new(): SVGPathSegCurvetoCubicSmoothAbs;
};

interface SVGPathSegCurvetoCubicSmoothRel extends SVGPathSeg {
    x: number;
    x2: number;
    y: number;
    y2: number;
}

declare var SVGPathSegCurvetoCubicSmoothRel: {
    prototype: SVGPathSegCurvetoCubicSmoothRel;
    new(): SVGPathSegCurvetoCubicSmoothRel;
};

interface SVGPathSegCurvetoQuadraticAbs extends SVGPathSeg {
    x: number;
    x1: number;
    y: number;
    y1: number;
}

declare var SVGPathSegCurvetoQuadraticAbs: {
    prototype: SVGPathSegCurvetoQuadraticAbs;
    new(): SVGPathSegCurvetoQuadraticAbs;
};

interface SVGPathSegCurvetoQuadraticRel extends SVGPathSeg {
    x: number;
    x1: number;
    y: number;
    y1: number;
}

declare var SVGPathSegCurvetoQuadraticRel: {
    prototype: SVGPathSegCurvetoQuadraticRel;
    new(): SVGPathSegCurvetoQuadraticRel;
};

interface SVGPathSegCurvetoQuadraticSmoothAbs extends SVGPathSeg {
    x: number;
    y: number;
}

declare var SVGPathSegCurvetoQuadraticSmoothAbs: {
    prototype: SVGPathSegCurvetoQuadraticSmoothAbs;
    new(): SVGPathSegCurvetoQuadraticSmoothAbs;
};

interface SVGPathSegCurvetoQuadraticSmoothRel extends SVGPathSeg {
    x: number;
    y: number;
}

declare var SVGPathSegCurvetoQuadraticSmoothRel: {
    prototype: SVGPathSegCurvetoQuadraticSmoothRel;
    new(): SVGPathSegCurvetoQuadraticSmoothRel;
};

interface SVGPathSegLinetoAbs extends SVGPathSeg {
    x: number;
    y: number;
}

declare var SVGPathSegLinetoAbs: {
    prototype: SVGPathSegLinetoAbs;
    new(): SVGPathSegLinetoAbs;
};

interface SVGPathSegLinetoHorizontalAbs extends SVGPathSeg {
    x: number;
}

declare var SVGPathSegLinetoHorizontalAbs: {
    prototype: SVGPathSegLinetoHorizontalAbs;
    new(): SVGPathSegLinetoHorizontalAbs;
};

interface SVGPathSegLinetoHorizontalRel extends SVGPathSeg {
    x: number;
}

declare var SVGPathSegLinetoHorizontalRel: {
    prototype: SVGPathSegLinetoHorizontalRel;
    new(): SVGPathSegLinetoHorizontalRel;
};

interface SVGPathSegLinetoRel extends SVGPathSeg {
    x: number;
    y: number;
}

declare var SVGPathSegLinetoRel: {
    prototype: SVGPathSegLinetoRel;
    new(): SVGPathSegLinetoRel;
};

interface SVGPathSegLinetoVerticalAbs extends SVGPathSeg {
    y: number;
}

declare var SVGPathSegLinetoVerticalAbs: {
    prototype: SVGPathSegLinetoVerticalAbs;
    new(): SVGPathSegLinetoVerticalAbs;
};

interface SVGPathSegLinetoVerticalRel extends SVGPathSeg {
    y: number;
}

declare var SVGPathSegLinetoVerticalRel: {
    prototype: SVGPathSegLinetoVerticalRel;
    new(): SVGPathSegLinetoVerticalRel;
};

interface SVGPathSegList {
    readonly numberOfItems: number;
    appendItem(newItem: SVGPathSeg): SVGPathSeg;
    clear(): void;
    getItem(index: number): SVGPathSeg;
    initialize(newItem: SVGPathSeg): SVGPathSeg;
    insertItemBefore(newItem: SVGPathSeg, index: number): SVGPathSeg;
    removeItem(index: number): SVGPathSeg;
    replaceItem(newItem: SVGPathSeg, index: number): SVGPathSeg;
}

declare var SVGPathSegList: {
    prototype: SVGPathSegList;
    new(): SVGPathSegList;
};

interface SVGPathSegMovetoAbs extends SVGPathSeg {
    x: number;
    y: number;
}

declare var SVGPathSegMovetoAbs: {
    prototype: SVGPathSegMovetoAbs;
    new(): SVGPathSegMovetoAbs;
};

interface SVGPathSegMovetoRel extends SVGPathSeg {
    x: number;
    y: number;
}

declare var SVGPathSegMovetoRel: {
    prototype: SVGPathSegMovetoRel;
    new(): SVGPathSegMovetoRel;
};

interface SVGPatternElement extends SVGElement, SVGTests, SVGFitToViewBox, SVGURIReference {
    /*! @ooml-mapto(addEventListener) */ addSVGPatternElementEventListener<T extends SVGElementEventType>(type: __Class<T>, listener: EventListener<SVGPatternElement, T>, options?: boolean | AddEventListenerOptions): void;
    /*! @ooml-mapto(removeEventListener) */ removeSVGPatternElementEventListener<T extends SVGElementEventType>(type: __Class<T>, listener: EventListener<SVGPatternElement, T>, options?: boolean | EventListenerOptions): void;
    readonly height: SVGAnimatedLength;
    readonly patternContentUnits: SVGAnimatedEnumeration;
    readonly patternTransform: SVGAnimatedTransformList;
    readonly patternUnits: SVGAnimatedEnumeration;
    readonly width: SVGAnimatedLength;
    readonly x: SVGAnimatedLength;
    readonly y: SVGAnimatedLength;
}

declare var SVGPatternElement: {
    prototype: SVGPatternElement;
    new(): SVGPatternElement;
};

interface SVGPoint {
    x: number;
    y: number;
    matrixTransform(matrix: SVGMatrix): SVGPoint;
}

declare var SVGPoint: {
    prototype: SVGPoint;
    new(): SVGPoint;
};

interface SVGPointList {
    readonly numberOfItems: number;
    appendItem(newItem: SVGPoint): SVGPoint;
    clear(): void;
    getItem(index: number): SVGPoint;
    initialize(newItem: SVGPoint): SVGPoint;
    insertItemBefore(newItem: SVGPoint, index: number): SVGPoint;
    removeItem(index: number): SVGPoint;
    replaceItem(newItem: SVGPoint, index: number): SVGPoint;
}

declare var SVGPointList: {
    prototype: SVGPointList;
    new(): SVGPointList;
};

interface SVGPolygonElement extends SVGGraphicsElement, SVGAnimatedPoints {
    /*! @ooml-mapto(addEventListener) */ addSVGPolygonElementEventListener<T extends SVGElementEventType>(type: __Class<T>, listener: EventListener<SVGPolygonElement, T>, options?: boolean | AddEventListenerOptions): void;
    /*! @ooml-mapto(removeEventListener) */ removeSVGPolygonElementEventListener<T extends SVGElementEventType>(type: __Class<T>, listener: EventListener<SVGPolygonElement, T>, options?: boolean | EventListenerOptions): void;
}

declare var SVGPolygonElement: {
    prototype: SVGPolygonElement;
    new(): SVGPolygonElement;
};

interface SVGPolylineElement extends SVGGraphicsElement, SVGAnimatedPoints {
    /*! @ooml-mapto(addEventListener) */ addSVGPolylineElementEventListener<T extends SVGElementEventType>(type: __Class<T>, listener: EventListener<SVGPolylineElement, T>, options?: boolean | AddEventListenerOptions): void;
    /*! @ooml-mapto(removeEventListener) */ removeSVGPolylineElementEventListener<T extends SVGElementEventType>(type: __Class<T>, listener: EventListener<SVGPolylineElement, T>, options?: boolean | EventListenerOptions): void;
}

declare var SVGPolylineElement: {
    prototype: SVGPolylineElement;
    new(): SVGPolylineElement;
};

interface SVGPreserveAspectRatio {
    align: number;
    meetOrSlice: number;
}

declare var SVGPreserveAspectRatio: {
    prototype: SVGPreserveAspectRatio;
    new(): SVGPreserveAspectRatio;
    readonly SVG_MEETORSLICE_MEET: number;
    readonly SVG_MEETORSLICE_SLICE: number;
    readonly SVG_MEETORSLICE_UNKNOWN: number;
    readonly SVG_PRESERVEASPECTRATIO_NONE: number;
    readonly SVG_PRESERVEASPECTRATIO_UNKNOWN: number;
    readonly SVG_PRESERVEASPECTRATIO_XMAXYMAX: number;
    readonly SVG_PRESERVEASPECTRATIO_XMAXYMID: number;
    readonly SVG_PRESERVEASPECTRATIO_XMAXYMIN: number;
    readonly SVG_PRESERVEASPECTRATIO_XMIDYMAX: number;
    readonly SVG_PRESERVEASPECTRATIO_XMIDYMID: number;
    readonly SVG_PRESERVEASPECTRATIO_XMIDYMIN: number;
    readonly SVG_PRESERVEASPECTRATIO_XMINYMAX: number;
    readonly SVG_PRESERVEASPECTRATIO_XMINYMID: number;
    readonly SVG_PRESERVEASPECTRATIO_XMINYMIN: number;
};

interface SVGRadialGradientElement extends SVGGradientElement {
    /*! @ooml-mapto(addEventListener) */ addSVGRadialGradientElementEventListener<T extends SVGElementEventType>(type: __Class<T>, listener: EventListener<SVGRadialGradientElement, T>, options?: boolean | AddEventListenerOptions): void;
    /*! @ooml-mapto(removeEventListener) */ removeSVGRadialGradientElementEventListener<T extends SVGElementEventType>(type: __Class<T>, listener: EventListener<SVGRadialGradientElement, T>, options?: boolean | EventListenerOptions): void;
    readonly cx: SVGAnimatedLength;
    readonly cy: SVGAnimatedLength;
    readonly fx: SVGAnimatedLength;
    readonly fy: SVGAnimatedLength;
    readonly r: SVGAnimatedLength;
}

declare var SVGRadialGradientElement: {
    prototype: SVGRadialGradientElement;
    new(): SVGRadialGradientElement;
};

interface SVGRect {
    height: number;
    width: number;
    x: number;
    y: number;
}

declare var SVGRect: {
    prototype: SVGRect;
    new(): SVGRect;
};

interface SVGRectElement extends SVGGraphicsElement {
    /*! @ooml-mapto(addEventListener) */ addSVGRectElementEventListener<T extends SVGElementEventType>(type: __Class<T>, listener: EventListener<SVGRectElement, T>, options?: boolean | AddEventListenerOptions): void;
    /*! @ooml-mapto(removeEventListener) */ removeSVGRectElementEventListener<T extends SVGElementEventType>(type: __Class<T>, listener: EventListener<SVGRectElement, T>, options?: boolean | EventListenerOptions): void;
    readonly height: SVGAnimatedLength;
    readonly rx: SVGAnimatedLength;
    readonly ry: SVGAnimatedLength;
    readonly width: SVGAnimatedLength;
    readonly x: SVGAnimatedLength;
    readonly y: SVGAnimatedLength;
}

declare var SVGRectElement: {
    prototype: SVGRectElement;
    new(): SVGRectElement;
};

interface SVGSVGElementEventType extends SVGElementEventType {
    "SVGAbort": Event;
    "SVGError": Event;
    "resize": UIEvent;
    "scroll": UIEvent;
    "SVGUnload": Event;
    "SVGZoom": SVGZoomEvent;
}

interface SVGSVGElement extends SVGGraphicsElement, SVGFitToViewBox, SVGZoomAndPan {
    /*! @ooml-mapto(addEventListener) */ addSVGSVGElementEventListener<T extends SVGSVGElementEventType>(type: __Class<T>, listener: EventListener<SVGSVGElement, T>, options?: boolean | AddEventListenerOptions): void;
    /*! @ooml-mapto(removeEventListener) */ removeSVGSVGElementEventListener<T extends SVGSVGElementEventType>(type: __Class<T>, listener: EventListener<SVGSVGElement, T>, options?: boolean | EventListenerOptions): void;
    /** @deprecated */
    contentScriptType: string;
    /** @deprecated */
    contentStyleType: string;
    currentScale: number;
    readonly currentTranslate: SVGPoint;
    readonly height: SVGAnimatedLength;
    /** @deprecated */
    readonly pixelUnitToMillimeterX: number;
    /** @deprecated */
    readonly pixelUnitToMillimeterY: number;
    /** @deprecated */
    readonly screenPixelToMillimeterX: number;
    /** @deprecated */
    readonly screenPixelToMillimeterY: number;
    /** @deprecated */
    readonly viewport: SVGRect;
    readonly width: SVGAnimatedLength;
    readonly x: SVGAnimatedLength;
    readonly y: SVGAnimatedLength;
    checkEnclosure(element: SVGElement, rect: SVGRect): boolean;
    checkIntersection(element: SVGElement, rect: SVGRect): boolean;
    createSVGAngle(): SVGAngle;
    createSVGLength(): SVGLength;
    createSVGMatrix(): SVGMatrix;
    createSVGNumber(): SVGNumber;
    createSVGPoint(): SVGPoint;
    createSVGRect(): SVGRect;
    createSVGTransform(): SVGTransform;
    createSVGTransformFromMatrix(matrix: SVGMatrix): SVGTransform;
    deselectAll(): void;
    /** @deprecated */
    forceRedraw(): void;
    getComputedStyle(elt: Element, pseudoElt?: string | null): CSSStyleDeclaration;
    /** @deprecated */
    getCurrentTime(): number;
    getElementById(elementId: string): Element;
    getEnclosureList(rect: SVGRect, referenceElement: SVGElement): NodeList<SVGElement>;
    getIntersectionList(rect: SVGRect, referenceElement: SVGElement): NodeList<SVGElement>;
    /** @deprecated */
    pauseAnimations(): void;
    /** @deprecated */
    setCurrentTime(seconds: number): void;
    /** @deprecated */
    suspendRedraw(maxWaitMilliseconds: number): number;
    /** @deprecated */
    unpauseAnimations(): void;
    /** @deprecated */
    unsuspendRedraw(suspendHandleID: number): void;
    /** @deprecated */
    unsuspendRedrawAll(): void;
}

declare var SVGSVGElement: {
    prototype: SVGSVGElement;
    new(): SVGSVGElement;
};

interface SVGScriptElement extends SVGElement, SVGURIReference {
    /*! @ooml-mapto(addEventListener) */ addSVGScriptElementEventListener<T extends SVGElementEventType>(type: __Class<T>, listener: EventListener<SVGScriptElement, T>, options?: boolean | AddEventListenerOptions): void;
    /*! @ooml-mapto(removeEventListener) */ removeSVGScriptElementEventListener<T extends SVGElementEventType>(type: __Class<T>, listener: EventListener<SVGScriptElement, T>, options?: boolean | EventListenerOptions): void;
    type: string;
}

declare var SVGScriptElement: {
    prototype: SVGScriptElement;
    new(): SVGScriptElement;
};

interface SVGStopElement extends SVGElement {
    /*! @ooml-mapto(addEventListener) */ addSVGStopElementEventListener<T extends SVGElementEventType>(type: __Class<T>, listener: EventListener<SVGStopElement, T>, options?: boolean | AddEventListenerOptions): void;
    /*! @ooml-mapto(removeEventListener) */ removeSVGStopElementEventListener<T extends SVGElementEventType>(type: __Class<T>, listener: EventListener<SVGStopElement, T>, options?: boolean | EventListenerOptions): void;
    readonly offset: SVGAnimatedNumber;
}

declare var SVGStopElement: {
    prototype: SVGStopElement;
    new(): SVGStopElement;
};

interface SVGStringList {
    readonly numberOfItems: number;
    appendItem(newItem: string): string;
    clear(): void;
    getItem(index: number): string;
    initialize(newItem: string): string;
    insertItemBefore(newItem: string, index: number): string;
    removeItem(index: number): string;
    replaceItem(newItem: string, index: number): string;
}

declare var SVGStringList: {
    prototype: SVGStringList;
    new(): SVGStringList;
};

interface SVGStylable {
    className: any;
}

declare var SVGStylable: {
    prototype: SVGStylable;
    new(): SVGStylable;
};

interface SVGStyleElement extends SVGElement {
    /*! @ooml-mapto(addEventListener) */ addSVGStyleElementEventListener<T extends SVGElementEventType>(type: __Class<T>, listener: EventListener<SVGStyleElement, T>, options?: boolean | AddEventListenerOptions): void;
    /*! @ooml-mapto(removeEventListener) */ removeSVGStyleElementEventListener<T extends SVGElementEventType>(type: __Class<T>, listener: EventListener<SVGStyleElement, T>, options?: boolean | EventListenerOptions): void;
    disabled: boolean;
    media: string;
    title: string;
    type: string;
}

declare var SVGStyleElement: {
    prototype: SVGStyleElement;
    new(): SVGStyleElement;
};

interface SVGSwitchElement extends SVGGraphicsElement {
    /*! @ooml-mapto(addEventListener) */ addSVGSwitchElementEventListener<T extends SVGElementEventType>(type: __Class<T>, listener: EventListener<SVGSwitchElement, T>, options?: boolean | AddEventListenerOptions): void;
    /*! @ooml-mapto(removeEventListener) */ removeSVGSwitchElementEventListener<T extends SVGElementEventType>(type: __Class<T>, listener: EventListener<SVGSwitchElement, T>, options?: boolean | EventListenerOptions): void;
}

declare var SVGSwitchElement: {
    prototype: SVGSwitchElement;
    new(): SVGSwitchElement;
};

interface SVGSymbolElement extends SVGElement, SVGFitToViewBox {
    /*! @ooml-mapto(addEventListener) */ addSVGSymbolElementEventListener<T extends SVGElementEventType>(type: __Class<T>, listener: EventListener<SVGSymbolElement, T>, options?: boolean | AddEventListenerOptions): void;
    /*! @ooml-mapto(removeEventListener) */ removeSVGSymbolElementEventListener<T extends SVGElementEventType>(type: __Class<T>, listener: EventListener<SVGSymbolElement, T>, options?: boolean | EventListenerOptions): void;
}

declare var SVGSymbolElement: {
    prototype: SVGSymbolElement;
    new(): SVGSymbolElement;
};

interface SVGTSpanElement extends SVGTextPositioningElement {
    /*! @ooml-mapto(addEventListener) */ addSVGTSpanElementEventListener<T extends SVGElementEventType>(type: __Class<T>, listener: EventListener<SVGTSpanElement, T>, options?: boolean | AddEventListenerOptions): void;
    /*! @ooml-mapto(removeEventListener) */ removeSVGTSpanElementEventListener<T extends SVGElementEventType>(type: __Class<T>, listener: EventListener<SVGTSpanElement, T>, options?: boolean | EventListenerOptions): void;
}

declare var SVGTSpanElement: {
    prototype: SVGTSpanElement;
    new(): SVGTSpanElement;
};

interface SVGTests /*! @ooml-interface */ {
    readonly requiredExtensions: SVGStringList;
    /** @deprecated */
    readonly requiredFeatures: SVGStringList;
    readonly systemLanguage: SVGStringList;
    /** @deprecated */
    hasExtension(extension: string): boolean;
}

interface SVGTextContentElement extends SVGGraphicsElement {
    /*! @ooml-mapto(addEventListener) */ addSVGTextContentElementEventListener<T extends SVGElementEventType>(type: __Class<T>, listener: EventListener<SVGTextContentElement, T>, options?: boolean | AddEventListenerOptions): void;
    /*! @ooml-mapto(removeEventListener) */ removeSVGTextContentElementEventListener<T extends SVGElementEventType>(type: __Class<T>, listener: EventListener<SVGTextContentElement, T>, options?: boolean | EventListenerOptions): void;
    readonly lengthAdjust: SVGAnimatedEnumeration;
    readonly textLength: SVGAnimatedLength;
    getCharNumAtPosition(point: SVGPoint): number;
    getComputedTextLength(): number;
    getEndPositionOfChar(charnum: number): SVGPoint;
    getExtentOfChar(charnum: number): SVGRect;
    getNumberOfChars(): number;
    getRotationOfChar(charnum: number): number;
    getStartPositionOfChar(charnum: number): SVGPoint;
    getSubStringLength(charnum: number, nchars: number): number;
    selectSubString(charnum: number, nchars: number): void;
}

declare var SVGTextContentElement: {
    prototype: SVGTextContentElement;
    new(): SVGTextContentElement;
    readonly LENGTHADJUST_SPACING: number;
    readonly LENGTHADJUST_SPACINGANDGLYPHS: number;
    readonly LENGTHADJUST_UNKNOWN: number;
};

interface SVGTextElement extends SVGTextPositioningElement {
    /*! @ooml-mapto(addEventListener) */ addSVGTextElementEventListener<T extends SVGElementEventType>(type: __Class<T>, listener: EventListener<SVGTextElement, T>, options?: boolean | AddEventListenerOptions): void;
    /*! @ooml-mapto(removeEventListener) */ removeSVGTextElementEventListener<T extends SVGElementEventType>(type: __Class<T>, listener: EventListener<SVGTextElement, T>, options?: boolean | EventListenerOptions): void;
}

declare var SVGTextElement: {
    prototype: SVGTextElement;
    new(): SVGTextElement;
};

interface SVGTextPathElement extends SVGTextContentElement, SVGURIReference {
    /*! @ooml-mapto(addEventListener) */ addSVGTextPathElementEventListener<T extends SVGElementEventType>(type: __Class<T>, listener: EventListener<SVGTextPathElement, T>, options?: boolean | AddEventListenerOptions): void;
    /*! @ooml-mapto(removeEventListener) */ removeSVGTextPathElementEventListener<T extends SVGElementEventType>(type: __Class<T>, listener: EventListener<SVGTextPathElement, T>, options?: boolean | EventListenerOptions): void;
    readonly method: SVGAnimatedEnumeration;
    readonly spacing: SVGAnimatedEnumeration;
    readonly startOffset: SVGAnimatedLength;
}

declare var SVGTextPathElement: {
    prototype: SVGTextPathElement;
    new(): SVGTextPathElement;
    readonly TEXTPATH_METHODTYPE_ALIGN: number;
    readonly TEXTPATH_METHODTYPE_STRETCH: number;
    readonly TEXTPATH_METHODTYPE_UNKNOWN: number;
    readonly TEXTPATH_SPACINGTYPE_AUTO: number;
    readonly TEXTPATH_SPACINGTYPE_EXACT: number;
    readonly TEXTPATH_SPACINGTYPE_UNKNOWN: number;
};

interface SVGTextPositioningElement extends SVGTextContentElement {
    /*! @ooml-mapto(addEventListener) */ addSVGTextPositioningElementEventListener<T extends SVGElementEventType>(type: __Class<T>, listener: EventListener<SVGTextPositioningElement, T>, options?: boolean | AddEventListenerOptions): void;
    /*! @ooml-mapto(removeEventListener) */ removeSVGTextPositioningElementEventListener<T extends SVGElementEventType>(type: __Class<T>, listener: EventListener<SVGTextPositioningElement, T>, options?: boolean | EventListenerOptions): void;
    readonly dx: SVGAnimatedLengthList;
    readonly dy: SVGAnimatedLengthList;
    readonly rotate: SVGAnimatedNumberList;
    readonly x: SVGAnimatedLengthList;
    readonly y: SVGAnimatedLengthList;
}

declare var SVGTextPositioningElement: {
    prototype: SVGTextPositioningElement;
    new(): SVGTextPositioningElement;
};

interface SVGTitleElement extends SVGElement {
    /*! @ooml-mapto(addEventListener) */ addSVGTitleElementEventListener<T extends SVGElementEventType>(type: __Class<T>, listener: EventListener<SVGTitleElement, T>, options?: boolean | AddEventListenerOptions): void;
    /*! @ooml-mapto(removeEventListener) */ removeSVGTitleElementEventListener<T extends SVGElementEventType>(type: __Class<T>, listener: EventListener<SVGTitleElement, T>, options?: boolean | EventListenerOptions): void;
}

declare var SVGTitleElement: {
    prototype: SVGTitleElement;
    new(): SVGTitleElement;
};

interface SVGTransform {
    readonly angle: number;
    readonly matrix: SVGMatrix;
    readonly type: number;
    setMatrix(matrix: SVGMatrix): void;
    setRotate(angle: number, cx: number, cy: number): void;
    setScale(sx: number, sy: number): void;
    setSkewX(angle: number): void;
    setSkewY(angle: number): void;
    setTranslate(tx: number, ty: number): void;
}

declare var SVGTransform: {
    prototype: SVGTransform;
    new(): SVGTransform;
    readonly SVG_TRANSFORM_MATRIX: number;
    readonly SVG_TRANSFORM_ROTATE: number;
    readonly SVG_TRANSFORM_SCALE: number;
    readonly SVG_TRANSFORM_SKEWX: number;
    readonly SVG_TRANSFORM_SKEWY: number;
    readonly SVG_TRANSFORM_TRANSLATE: number;
    readonly SVG_TRANSFORM_UNKNOWN: number;
};

interface SVGTransformList {
    readonly numberOfItems: number;
    appendItem(newItem: SVGTransform): SVGTransform;
    clear(): void;
    consolidate(): SVGTransform;
    createSVGTransformFromMatrix(matrix: SVGMatrix): SVGTransform;
    getItem(index: number): SVGTransform;
    initialize(newItem: SVGTransform): SVGTransform;
    insertItemBefore(newItem: SVGTransform, index: number): SVGTransform;
    removeItem(index: number): SVGTransform;
    replaceItem(newItem: SVGTransform, index: number): SVGTransform;
}

declare var SVGTransformList: {
    prototype: SVGTransformList;
    new(): SVGTransformList;
};

interface SVGURIReference /*! @ooml-interface */ {
    readonly href: SVGAnimatedString;
}

interface SVGUnitTypes /*! @ooml-static */ {
  readonly SVG_UNIT_TYPE_OBJECTBOUNDINGBOX: number;
  readonly SVG_UNIT_TYPE_UNKNOWN: number;
  readonly SVG_UNIT_TYPE_USERSPACEONUSE: number;
}

interface SVGUseElement extends SVGGraphicsElement, SVGURIReference {
    /*! @ooml-mapto(addEventListener) */ addSVGUseElementEventListener<T extends SVGElementEventType>(type: __Class<T>, listener: EventListener<SVGUseElement, T>, options?: boolean | AddEventListenerOptions): void;
    /*! @ooml-mapto(removeEventListener) */ removeSVGUseElementEventListener<T extends SVGElementEventType>(type: __Class<T>, listener: EventListener<SVGUseElement, T>, options?: boolean | EventListenerOptions): void;
    readonly animatedInstanceRoot: SVGElementInstance | null;
    readonly height: SVGAnimatedLength;
    readonly instanceRoot: SVGElementInstance | null;
    readonly width: SVGAnimatedLength;
    readonly x: SVGAnimatedLength;
    readonly y: SVGAnimatedLength;
}

declare var SVGUseElement: {
    prototype: SVGUseElement;
    new(): SVGUseElement;
};

interface SVGViewElement extends SVGElement, SVGFitToViewBox, SVGZoomAndPan {
    /*! @ooml-mapto(addEventListener) */ addSVGViewElementEventListener<T extends SVGElementEventType>(type: __Class<T>, listener: EventListener<SVGViewElement, T>, options?: boolean | AddEventListenerOptions): void;
    /*! @ooml-mapto(removeEventListener) */ removeSVGViewElementEventListener<T extends SVGElementEventType>(type: __Class<T>, listener: EventListener<SVGViewElement, T>, options?: boolean | EventListenerOptions): void;
    /** @deprecated */
    readonly viewTarget: SVGStringList;
}

declare var SVGViewElement: {
    prototype: SVGViewElement;
    new(): SVGViewElement;
};

interface SVGZoomAndPan /*! @ooml-interface */ {
    readonly zoomAndPan: number;
    /*! @ooml-static */ readonly SVG_ZOOMANDPAN_DISABLE: number;
    /*! @ooml-static */ readonly SVG_ZOOMANDPAN_MAGNIFY: number;
    /*! @ooml-static */ readonly SVG_ZOOMANDPAN_UNKNOWN: number;
}

interface SVGZoomEvent extends UIEvent {
    readonly newScale: number;
    readonly newTranslate: SVGPoint;
    readonly previousScale: number;
    readonly previousTranslate: SVGPoint;
    readonly zoomRectScreen: SVGRect;
}

declare var SVGZoomEvent: {
    prototype: SVGZoomEvent;
    new(): SVGZoomEvent;
};

interface ScopedCredential {
    readonly id: ArrayBuffer;
    readonly type: ScopedCredentialType;
}

declare var ScopedCredential: {
    prototype: ScopedCredential;
    new(): ScopedCredential;
};

interface ScopedCredentialInfo {
    readonly credential: ScopedCredential;
    readonly publicKey: CryptoKey;
}

declare var ScopedCredentialInfo: {
    prototype: ScopedCredentialInfo;
    new(): ScopedCredentialInfo;
};

interface ScreenEventType {
    "MSOrientationChange": Event;
}

interface Screen extends EventTarget {
    /*! @ooml-mapto(addEventListener) */ addScreenEventListener<T extends ScreenEventType>(type: __Class<T>, listener: EventListener<Screen, T>, options?: boolean | AddEventListenerOptions): void;
    /*! @ooml-mapto(removeEventListener) */ removeScreenEventListener<T extends ScreenEventType>(type: __Class<T>, listener: EventListener<Screen, T>, options?: boolean | EventListenerOptions): void;
    readonly availHeight: number;
    readonly availWidth: number;
    /** @deprecated */
    bufferDepth: number;
    readonly colorDepth: number;
    readonly deviceXDPI: number;
    readonly deviceYDPI: number;
    readonly fontSmoothingEnabled: boolean;
    readonly height: number;
    readonly logicalXDPI: number;
    readonly logicalYDPI: number;
    readonly msOrientation: string;
    readonly pixelDepth: number;
    readonly systemXDPI: number;
    readonly systemYDPI: number;
    readonly width: number;
    lockOrientation(orientations: OrientationLockType | OrientationLockType[]): boolean;
    msLockOrientation(orientations: string | string[]): boolean;
    msUnlockOrientation(): void;
    unlockOrientation(): void;
}

declare var Screen: {
    prototype: Screen;
    new(): Screen;
};

interface ScriptProcessorNodeEventType {
    "audioprocess": AudioProcessingEvent;
}

interface ScriptProcessorNode extends AudioNode {
    /*! @ooml-mapto(addEventListener) */ addScriptProcessorNodeEventListener<T extends ScriptProcessorNodeEventType>(type: __Class<T>, listener: EventListener<ScriptProcessorNode, T>, options?: boolean | AddEventListenerOptions): void;
    /*! @ooml-mapto(removeEventListener) */ removeScriptProcessorNodeEventListener<T extends ScriptProcessorNodeEventType>(type: __Class<T>, listener: EventListener<ScriptProcessorNode, T>, options?: boolean | EventListenerOptions): void;
    /** @deprecated */
    readonly bufferSize: number;
}

declare var ScriptProcessorNode: {
    prototype: ScriptProcessorNode;
    new(): ScriptProcessorNode;
};

interface ScrollIntoViewOptions extends ScrollOptions {
    block?: ScrollLogicalPosition;
    inline?: ScrollLogicalPosition;
}

interface ScrollOptions {
    behavior?: ScrollBehavior;
}

interface ScrollToOptions extends ScrollOptions {
    left?: number;
    top?: number;
}

interface SecurityPolicyViolationEvent extends Event {
    readonly blockedURI: string;
    readonly columnNumber: number;
    readonly documentURI: string;
    readonly effectiveDirective: string;
    readonly lineNumber: number;
    readonly originalPolicy: string;
    readonly referrer: string;
    readonly sourceFile: string;
    readonly statusCode: number;
    readonly violatedDirective: string;
}

declare var SecurityPolicyViolationEvent: {
    prototype: SecurityPolicyViolationEvent;
    new(type: string, eventInitDict?: SecurityPolicyViolationEventInit): SecurityPolicyViolationEvent;
};

interface Selection {
    readonly anchorNode: Node;
    readonly anchorOffset: number;
    readonly baseNode: Node;
    readonly baseOffset: number;
    readonly extentNode: Node;
    readonly extentOffset: number;
    readonly focusNode: Node;
    readonly focusOffset: number;
    readonly isCollapsed: boolean;
    readonly rangeCount: number;
    readonly type: string;
    addRange(range: Range): void;
    collapse(parentNode: Node, offset: number): void;
    collapseToEnd(): void;
    collapseToStart(): void;
    containsNode(node: Node, partlyContained: boolean): boolean;
    deleteFromDocument(): void;
    empty(): void;
    extend(newNode: Node, offset: number): void;
    getRangeAt(index: number): Range;
    removeAllRanges(): void;
    removeRange(range: Range): void;
    selectAllChildren(parentNode: Node): void;
    setBaseAndExtent(baseNode: Node, baseOffset: number, extentNode: Node, extentOffset: number): void;
    setPosition(parentNode: Node, offset: number): void;
}

declare var Selection: {
    prototype: Selection;
    new(): Selection;
};

interface ServiceUIFrameContext {
    getCachedFrameMessage(key: string): string;
    postFrameMessage(key: string, data: string): void;
}
declare var ServiceUIFrameContext: ServiceUIFrameContext;

interface ServiceWorkerEventType extends AbstractWorkerEventType {
    "statechange": Event;
}

interface ServiceWorker extends AbstractWorker {
    /*! @ooml-mapto(addEventListener) */ addServiceWorkerEventListener<T extends ServiceWorkerEventType>(type: __Class<T>, listener: EventListener<ServiceWorker, T>, options?: boolean | AddEventListenerOptions): void;
    /*! @ooml-mapto(removeEventListener) */ removeServiceWorkerEventListener<T extends ServiceWorkerEventType>(type: __Class<T>, listener: EventListener<ServiceWorker, T>, options?: boolean | EventListenerOptions): void;
    readonly scriptURL: string;
    readonly state: ServiceWorkerState;
    postMessage(message: any, transfer?: any[]): void;
}

declare var ServiceWorker: {
    prototype: ServiceWorker;
    new(): ServiceWorker;
};

interface ServiceWorkerContainerEventType {
    "controllerchange": Event;
    "message": ServiceWorkerMessageEvent;
    "messageerror": MessageEvent;
}

interface ServiceWorkerContainer extends EventTarget {
    /*! @ooml-mapto(addEventListener) */ addServiceWorkerContainerEventListener<T extends ServiceWorkerContainerEventType>(type: __Class<T>, listener: EventListener<ServiceWorkerContainer, T>, options?: boolean | AddEventListenerOptions): void;
    /*! @ooml-mapto(removeEventListener) */ removeServiceWorkerContainerEventListener<T extends ServiceWorkerContainerEventType>(type: __Class<T>, listener: EventListener<ServiceWorkerContainer, T>, options?: boolean | EventListenerOptions): void;
    readonly controller: ServiceWorker | null;
    readonly ready: Promise<ServiceWorkerRegistration>;
    getRegistration(clientURL?: string): Promise<ServiceWorkerRegistration | null>;
    getRegistrations(): Promise<ServiceWorkerRegistration[]>;
    register(scriptURL: string, options?: RegistrationOptions): Promise<ServiceWorkerRegistration>;
    startMessages(): void;
}

declare var ServiceWorkerContainer: {
    prototype: ServiceWorkerContainer;
    new(): ServiceWorkerContainer;
};

interface ServiceWorkerMessageEvent extends Event {
    readonly data: any;
    readonly lastEventId: string;
    readonly origin: string;
    readonly ports: ReadonlyArray<MessagePort> | null;
    readonly source: ServiceWorker | MessagePort | null;
}

declare var ServiceWorkerMessageEvent: {
    prototype: ServiceWorkerMessageEvent;
    new(type: string, eventInitDict?: ServiceWorkerMessageEventInit): ServiceWorkerMessageEvent;
};

interface ServiceWorkerRegistrationEventType {
    "updatefound": Event;
}

interface ServiceWorkerRegistration extends EventTarget {
    /*! @ooml-mapto(addEventListener) */ addServiceWorkerRegistrationEventListener<T extends ServiceWorkerRegistrationEventType>(type: __Class<T>, listener: EventListener<ServiceWorkerRegistration, T>, options?: boolean | AddEventListenerOptions): void;
    /*! @ooml-mapto(removeEventListener) */ removeServiceWorkerRegistrationEventListener<T extends ServiceWorkerRegistrationEventType>(type: __Class<T>, listener: EventListener<ServiceWorkerRegistration, T>, options?: boolean | EventListenerOptions): void;
    readonly active: ServiceWorker | null;
    readonly installing: ServiceWorker | null;
    readonly pushManager: PushManager;
    readonly scope: string;
    readonly sync: SyncManager;
    readonly waiting: ServiceWorker | null;
    getNotifications(filter?: GetNotificationOptions): Promise<Notification[]>;
    showNotification(title: string, options?: NotificationOptions): Promise<void>;
    unregister(): Promise<boolean>;
    update(): Promise<void>;
}

declare var ServiceWorkerRegistration: {
    prototype: ServiceWorkerRegistration;
    new(): ServiceWorkerRegistration;
};

interface ShadowRoot extends DocumentOrShadowRoot, DocumentFragment {
    readonly host: Element;
    innerHTML: string;
}

interface ShadowRootInit {
    delegatesFocus?: boolean;
    mode: "open" | "closed";
}

interface SourceBuffer extends EventTarget {
    appendWindowEnd: number;
    appendWindowStart: number;
    readonly audioTracks: AudioTrackList;
    readonly buffered: TimeRanges;
    mode: AppendMode;
    readonly textTracks: TextTrackList;
    timestampOffset: number;
    readonly updating: boolean;
    readonly videoTracks: VideoTrackList;
    abort(): void;
    appendBuffer(data: BufferSource | null): void;
    appendStream(stream: MSStream, maxSize?: number): void;
    remove(start: number, end: number): void;
}

declare var SourceBuffer: {
    prototype: SourceBuffer;
    new(): SourceBuffer;
};

interface SourceBufferList extends EventTarget {
    readonly length: number;
    item(index: number): SourceBuffer;
    [index: number]: SourceBuffer;
}

declare var SourceBufferList: {
    prototype: SourceBufferList;
    new(): SourceBufferList;
};

interface SpeechSynthesisEventType {
    "voiceschanged": Event;
}

interface SpeechSynthesis extends EventTarget {
    /*! @ooml-mapto(addEventListener) */ addSpeechSynthesisEventListener<T extends SpeechSynthesisEventType>(type: __Class<T>, listener: EventListener<SpeechSynthesis, T>, options?: boolean | AddEventListenerOptions): void;
    /*! @ooml-mapto(removeEventListener) */ removeSpeechSynthesisEventListener<T extends SpeechSynthesisEventType>(type: __Class<T>, listener: EventListener<SpeechSynthesis, T>, options?: boolean | EventListenerOptions): void;
    readonly paused: boolean;
    readonly pending: boolean;
    readonly speaking: boolean;
    cancel(): void;
    getVoices(): SpeechSynthesisVoice[];
    pause(): void;
    resume(): void;
    speak(utterance: SpeechSynthesisUtterance): void;
}

declare var SpeechSynthesis: {
    prototype: SpeechSynthesis;
    new(): SpeechSynthesis;
};

interface SpeechSynthesisEvent extends Event {
    readonly charIndex: number;
    readonly charLength: number;
    readonly elapsedTime: number;
    readonly name: string;
    readonly utterance: SpeechSynthesisUtterance;
}

declare var SpeechSynthesisEvent: {
    prototype: SpeechSynthesisEvent;
    new(type: string, eventInitDict?: SpeechSynthesisEventInit): SpeechSynthesisEvent;
};

interface SpeechSynthesisUtteranceEventType {
    "boundary": Event;
    "end": Event;
    "error": Event;
    "mark": Event;
    "pause": Event;
    "resume": Event;
    "start": Event;
}

interface SpeechSynthesisUtterance extends EventTarget {
    /*! @ooml-mapto(addEventListener) */ addSpeechSynthesisUtteranceEventListener<T extends SpeechSynthesisUtteranceEventType>(type: __Class<T>, listener: EventListener<SpeechSynthesisUtterance, T>, options?: boolean | AddEventListenerOptions): void;
    /*! @ooml-mapto(removeEventListener) */ removeSpeechSynthesisUtteranceEventListener<T extends SpeechSynthesisUtteranceEventType>(type: __Class<T>, listener: EventListener<SpeechSynthesisUtterance, T>, options?: boolean | EventListenerOptions): void;
    lang: string;
    pitch: number;
    rate: number;
    text: string;
    voice: SpeechSynthesisVoice;
    volume: number;
}

declare var SpeechSynthesisUtterance: {
    prototype: SpeechSynthesisUtterance;
    new(): SpeechSynthesisUtterance;
    new(text: string): SpeechSynthesisUtterance;
};

interface SpeechSynthesisVoice {
    readonly default: boolean;
    readonly lang: string;
    readonly localService: boolean;
    readonly name: string;
    readonly voiceURI: string;
}

declare var SpeechSynthesisVoice: {
    prototype: SpeechSynthesisVoice;
    new(): SpeechSynthesisVoice;
};

interface StereoPannerNode extends AudioNode {
    readonly pan: AudioParam;
}

declare var StereoPannerNode: {
    prototype: StereoPannerNode;
    new(): StereoPannerNode;
};

interface Storage {
    readonly length: number;
    clear(): void;
    getItem(key: string): string | null;
    key(index: number): string | null;
    removeItem(key: string): void;
    setItem(key: string, value: string): void;
    [key: string]: any;
}

declare var Storage: {
    prototype: Storage;
    new(): Storage;
};

interface StorageEvent extends Event {
    readonly key: string | null;
    readonly newValue: string | null;
    readonly oldValue: string | null;
    readonly storageArea: Storage | null;
    readonly url: string;
}

declare var StorageEvent: {
    prototype: StorageEvent;
    new (type: string, eventInitDict?: StorageEventInit): StorageEvent;
};

interface StorageEventInit extends EventInit {
    key?: string;
    newValue?: string;
    oldValue?: string;
    storageArea?: Storage;
    url: string;
}

interface StyleMedia {
    readonly type: string;
    matchMedium(mediaquery: string): boolean;
}

declare var StyleMedia: {
    prototype: StyleMedia;
    new(): StyleMedia;
};

interface StyleSheet {
    disabled: boolean;
    readonly href: string | null;
    readonly media: MediaList;
    readonly ownerNode: Node;
    readonly parentStyleSheet: StyleSheet | null;
    readonly title: string | null;
    readonly type: string;
}

declare var StyleSheet: {
    prototype: StyleSheet;
    new(): StyleSheet;
};

interface StyleSheetList {
    readonly length: number;
    item(index: number): StyleSheet | null;
    [index: number]: StyleSheet;
}

declare var StyleSheetList: {
    prototype: StyleSheetList;
    new(): StyleSheetList;
};

interface SubtleCrypto {
    decrypt(algorithm: string | RsaOaepParams | AesCtrParams | AesCbcParams | AesCmacParams | AesGcmParams | AesCfbParams, key: CryptoKey, data: BufferSource): Promise<ArrayBuffer>;
    deriveBits(algorithm: string | EcdhKeyDeriveParams | DhKeyDeriveParams | ConcatParams | HkdfCtrParams | Pbkdf2Params, baseKey: CryptoKey, length: number): Promise<ArrayBuffer>;
    deriveKey(algorithm: string | EcdhKeyDeriveParams | DhKeyDeriveParams | ConcatParams | HkdfCtrParams | Pbkdf2Params, baseKey: CryptoKey, derivedKeyType: string | AesDerivedKeyParams | HmacImportParams | ConcatParams | HkdfCtrParams | Pbkdf2Params, extractable: boolean, keyUsages: string[]): Promise<CryptoKey>;
    digest(algorithm: AlgorithmIdentifier, data: BufferSource): Promise<ArrayBuffer>;
    encrypt(algorithm: string | RsaOaepParams | AesCtrParams | AesCbcParams | AesCmacParams | AesGcmParams | AesCfbParams, key: CryptoKey, data: BufferSource): Promise<ArrayBuffer>;
    exportKey(format: string, key: CryptoKey): Promise<JsonWebKey | ArrayBuffer>;
    generateKey(algorithm: string, extractable: boolean, keyUsages: string[]): Promise<CryptoKeyPair | CryptoKey>;
    generateKey(algorithm: RsaHashedKeyGenParams | EcKeyGenParams | DhKeyGenParams, extractable: boolean, keyUsages: string[]): Promise<CryptoKeyPair>;
    generateKey(algorithm: AesKeyGenParams | HmacKeyGenParams | Pbkdf2Params, extractable: boolean, keyUsages: string[]): Promise<CryptoKey>;
    importKey(format: string, keyData: JsonWebKey | BufferSource, algorithm: string | RsaHashedImportParams | EcKeyImportParams | HmacImportParams | DhImportKeyParams, extractable: boolean, keyUsages: string[]): Promise<CryptoKey>;
    sign(algorithm: string | RsaPssParams | EcdsaParams | AesCmacParams, key: CryptoKey, data: BufferSource): Promise<ArrayBuffer>;
    unwrapKey(format: string, wrappedKey: BufferSource, unwrappingKey: CryptoKey, unwrapAlgorithm: AlgorithmIdentifier, unwrappedKeyAlgorithm: AlgorithmIdentifier, extractable: boolean, keyUsages: string[]): Promise<CryptoKey>;
    verify(algorithm: string | RsaPssParams | EcdsaParams | AesCmacParams, key: CryptoKey, signature: BufferSource, data: BufferSource): Promise<boolean>;
    wrapKey(format: string, key: CryptoKey, wrappingKey: CryptoKey, wrapAlgorithm: AlgorithmIdentifier): Promise<ArrayBuffer>;
}

declare var SubtleCrypto: {
    prototype: SubtleCrypto;
    new(): SubtleCrypto;
};

interface SyncManager {
    getTags(): Promise<string[]>;
    register(tag: string): Promise<void>;
}

declare var SyncManager: {
    prototype: SyncManager;
    new(): SyncManager;
};

interface Text extends CharacterData {
    readonly assignedSlot: HTMLSlotElement | null;
    readonly wholeText: string;
    splitText(offset: number): Text;
}

declare var Text: {
    prototype: Text;
    new(data?: string): Text;
};

interface TextDecoder {
    readonly encoding: string;
    readonly fatal: boolean;
    readonly ignoreBOM: boolean;
    decode(input?: BufferSource | null, options?: TextDecodeOptions): string;
}

declare var TextDecoder: {
    prototype: TextDecoder;
    new(label?: string, options?: TextDecoderOptions): TextDecoder;
};

interface TextEncoder {
    readonly encoding: string;
    encode(input?: string): Uint8Array;
}

declare var TextEncoder: {
    prototype: TextEncoder;
    new(): TextEncoder;
};

interface TextEvent extends UIEvent {
    readonly data: string;
    initTextEvent(typeArg: string, canBubbleArg: boolean, cancelableArg: boolean, viewArg: Window, dataArg: string, inputMethod: number, locale: string): void;
}

declare var TextEvent: {
    prototype: TextEvent;
    new(): TextEvent;
    readonly DOM_INPUT_METHOD_DROP: number;
    readonly DOM_INPUT_METHOD_HANDWRITING: number;
    readonly DOM_INPUT_METHOD_IME: number;
    readonly DOM_INPUT_METHOD_KEYBOARD: number;
    readonly DOM_INPUT_METHOD_MULTIMODAL: number;
    readonly DOM_INPUT_METHOD_OPTION: number;
    readonly DOM_INPUT_METHOD_PASTE: number;
    readonly DOM_INPUT_METHOD_SCRIPT: number;
    readonly DOM_INPUT_METHOD_UNKNOWN: number;
    readonly DOM_INPUT_METHOD_VOICE: number;
};

interface TextMetrics {
    readonly width: number;
}

declare var TextMetrics: {
    prototype: TextMetrics;
    new(): TextMetrics;
};

interface TextTrackEventType {
    "cuechange": Event;
    "error": Event;
    "load": Event;
}

interface TextTrack extends EventTarget {
    /*! @ooml-mapto(addEventListener) */ addTextTrackEventListener<T extends TextTrackEventType>(type: __Class<T>, listener: EventListener<TextTrack, T>, options?: boolean | AddEventListenerOptions): void;
    /*! @ooml-mapto(removeEventListener) */ removeTextTrackEventListener<T extends TextTrackEventType>(type: __Class<T>, listener: EventListener<TextTrack, T>, options?: boolean | EventListenerOptions): void;
    readonly activeCues: TextTrackCueList;
    readonly cues: TextTrackCueList;
    readonly inBandMetadataTrackDispatchType: string;
    readonly kind: string;
    readonly label: string;
    readonly language: string;
    mode: TextTrackMode | number;
    readonly readyState: number;
    addCue(cue: TextTrackCue): void;
    removeCue(cue: TextTrackCue): void;
}

declare var TextTrack: {
    prototype: TextTrack;
    new(): TextTrack;
    readonly DISABLED: number;
    readonly ERROR: number;
    readonly HIDDEN: number;
    readonly LOADED: number;
    readonly LOADING: number;
    readonly NONE: number;
    readonly SHOWING: number;
};

interface TextTrackCueEventType {
    "enter": Event;
    "exit": Event;
}

interface TextTrackCue extends EventTarget {
    /*! @ooml-mapto(addEventListener) */ addTextTrackCueEventListener<T extends TextTrackCueEventType>(type: __Class<T>, listener: EventListener<TextTrackCue, T>, options?: boolean | AddEventListenerOptions): void;
    /*! @ooml-mapto(removeEventListener) */ removeTextTrackCueEventListener<T extends TextTrackCueEventType>(type: __Class<T>, listener: EventListener<TextTrackCue, T>, options?: boolean | EventListenerOptions): void;
    endTime: number;
    id: string;
    pauseOnExit: boolean;
    startTime: number;
    text: string;
    readonly track: TextTrack;
    getCueAsHTML(): DocumentFragment;
}

declare var TextTrackCue: {
    prototype: TextTrackCue;
    new(startTime: number, endTime: number, text: string): TextTrackCue;
};

interface TextTrackCueList {
    readonly length: number;
    getCueById(id: string): TextTrackCue;
    item(index: number): TextTrackCue;
    [index: number]: TextTrackCue;
}

declare var TextTrackCueList: {
    prototype: TextTrackCueList;
    new(): TextTrackCueList;
};

interface TextTrackListEventType {
    "addtrack": TrackEvent;
}

interface TextTrackList extends EventTarget {
    /*! @ooml-mapto(addEventListener) */ addTextTrackListEventListener<T extends TextTrackListEventType>(type: __Class<T>, listener: EventListener<TextTrackList, T>, options?: boolean | AddEventListenerOptions): void;
    /*! @ooml-mapto(removeEventListener) */ removeTextTrackListEventListener<T extends TextTrackListEventType>(type: __Class<T>, listener: EventListener<TextTrackList, T>, options?: boolean | EventListenerOptions): void;
    readonly length: number;
    item(index: number): TextTrack;


    [index: number]: TextTrack;
}

declare var TextTrackList: {
    prototype: TextTrackList;
    new(): TextTrackList;
};

interface TimeRanges {
    readonly length: number;
    end(index: number): number;
    start(index: number): number;
}

declare var TimeRanges: {
    prototype: TimeRanges;
    new(): TimeRanges;
};

interface Touch {
    readonly clientX: number;
    readonly clientY: number;
    readonly identifier: number;
    readonly pageX: number;
    readonly pageY: number;
    readonly screenX: number;
    readonly screenY: number;
    readonly target: EventTarget;
}

declare var Touch: {
    prototype: Touch;
    new(): Touch;
};

interface TouchEvent extends UIEvent {
    readonly altKey: boolean;
    readonly changedTouches: TouchList;
    readonly charCode: number;
    readonly ctrlKey: boolean;
    readonly keyCode: number;
    readonly metaKey: boolean;
    readonly shiftKey: boolean;
    readonly targetTouches: TouchList;
    readonly touches: TouchList;
    /** @deprecated */
    readonly which: number;
}

declare var TouchEvent: {
    prototype: TouchEvent;
    new(type: string, touchEventInit?: TouchEventInit): TouchEvent;
};

interface TouchEventInit extends EventModifierInit {
    changedTouches?: Touch[];
    targetTouches?: Touch[];
    touches?: Touch[];
}

interface TouchList {
    readonly length: number;
    item(index: number): Touch | null;
    [index: number]: Touch;
}

declare var TouchList: {
    prototype: TouchList;
    new(): TouchList;
};

interface TrackEvent extends Event {
    readonly track: VideoTrack | AudioTrack | TextTrack | null;
}

declare var TrackEvent: {
    prototype: TrackEvent;
    new(typeArg: string, eventInitDict?: TrackEventInit): TrackEvent;
};

interface TransitionEvent extends Event {
    readonly elapsedTime: number;
    readonly propertyName: string;
    initTransitionEvent(typeArg: string, canBubbleArg: boolean, cancelableArg: boolean, propertyNameArg: string, elapsedTimeArg: number): void;
}

declare var TransitionEvent: {
    prototype: TransitionEvent;
    new(typeArg: string, eventInitDict?: TransitionEventInit): TransitionEvent;
};

interface TreeWalker {
    currentNode: Node;
    /** @deprecated */
    readonly expandEntityReferences: boolean;
    readonly filter: NodeFilter | null;
    readonly root: Node;
    readonly whatToShow: number;
    firstChild(): Node | null;
    lastChild(): Node | null;
    nextNode(): Node | null;
    nextSibling(): Node | null;
    parentNode(): Node | null;
    previousNode(): Node | null;
    previousSibling(): Node | null;
}

declare var TreeWalker: {
    prototype: TreeWalker;
    new(): TreeWalker;
};

interface UIEvent extends Event {
    readonly detail: number;
    readonly view: Window;
    initUIEvent(typeArg: string, canBubbleArg: boolean, cancelableArg: boolean, viewArg: Window, detailArg: number): void;
}

declare var UIEvent: {
    prototype: UIEvent;
    new(typeArg: string, eventInitDict?: UIEventInit): UIEvent;
};

interface URL {
    hash: string;
    host: string;
    hostname: string;
    href: string;
    readonly origin: string;
    password: string;
    pathname: string;
    port: string;
    protocol: string;
    search: string;
    readonly searchParams: URLSearchParams;
    username: string;
}

declare var URL: {
    prototype: URL;
    new(url: string, base?: string | URL): URL;
    createObjectURL(object: any, options?: ObjectURLOptions): string;
    revokeObjectURL(url: string): void;
};

interface URLSearchParams {
    /**
     * Appends a specified key/value pair as a new search parameter.
     */
    append(name: string, value: string): void;
    /**
     * Deletes the given search parameter, and its associated value, from the list of all search parameters.
     */
    delete(name: string): void;
    /**
     * Returns the first value associated to the given search parameter.
     */
    get(name: string): string | null;
    /**
     * Returns all the values association with a given search parameter.
     */
    getAll(name: string): string[];
    /**
     * Returns a Boolean indicating if such a search parameter exists.
     */
    has(name: string): boolean;
    /**
     * Sets the value associated to a given search parameter to the given value. If there were several values, delete the others.
     */
    set(name: string, value: string): void;
}

declare var URLSearchParams: {
    prototype: URLSearchParams;
    new (init?: string | URLSearchParams): URLSearchParams;
};

interface VRDisplay extends EventTarget {
    readonly capabilities: VRDisplayCapabilities;
    depthFar: number;
    depthNear: number;
    readonly displayId: number;
    readonly displayName: string;
    readonly isConnected: boolean;
    readonly isPresenting: boolean;
    readonly stageParameters: VRStageParameters | null;
    cancelAnimationFrame(handle: number): void;
    exitPresent(): Promise<void>;
    getEyeParameters(whichEye: string): VREyeParameters;
    getFrameData(frameData: VRFrameData): boolean;
    getLayers(): VRLayer[];
    /** @deprecated */
    getPose(): VRPose;
    requestAnimationFrame(callback: FrameRequestCallback): number;
    requestPresent(layers: VRLayer[]): Promise<void>;
    resetPose(): void;
    submitFrame(pose?: VRPose): void;
}

declare var VRDisplay: {
    prototype: VRDisplay;
    new(): VRDisplay;
};

interface VRDisplayCapabilities {
    readonly canPresent: boolean;
    readonly hasExternalDisplay: boolean;
    readonly hasOrientation: boolean;
    readonly hasPosition: boolean;
    readonly maxLayers: number;
}

declare var VRDisplayCapabilities: {
    prototype: VRDisplayCapabilities;
    new(): VRDisplayCapabilities;
};

interface VRDisplayEvent extends Event {
    readonly display: VRDisplay;
    readonly reason: VRDisplayEventReason | null;
}

declare var VRDisplayEvent: {
    prototype: VRDisplayEvent;
    new(type: string, eventInitDict: VRDisplayEventInit): VRDisplayEvent;
};

interface VREyeParameters {
    /** @deprecated */
    readonly fieldOfView: VRFieldOfView;
    readonly offset: Float32Array;
    readonly renderHeight: number;
    readonly renderWidth: number;
}

declare var VREyeParameters: {
    prototype: VREyeParameters;
    new(): VREyeParameters;
};

interface VRFieldOfView {
    readonly downDegrees: number;
    readonly leftDegrees: number;
    readonly rightDegrees: number;
    readonly upDegrees: number;
}

declare var VRFieldOfView: {
    prototype: VRFieldOfView;
    new(): VRFieldOfView;
};

interface VRFrameData {
    readonly leftProjectionMatrix: Float32Array;
    readonly leftViewMatrix: Float32Array;
    readonly pose: VRPose;
    readonly rightProjectionMatrix: Float32Array;
    readonly rightViewMatrix: Float32Array;
    readonly timestamp: number;
}

declare var VRFrameData: {
    prototype: VRFrameData;
    new(): VRFrameData;
};

interface VRPose {
    readonly angularAcceleration: Float32Array | null;
    readonly angularVelocity: Float32Array | null;
    readonly linearAcceleration: Float32Array | null;
    readonly linearVelocity: Float32Array | null;
    readonly orientation: Float32Array | null;
    readonly position: Float32Array | null;
    readonly timestamp: number;
}

declare var VRPose: {
    prototype: VRPose;
    new(): VRPose;
};

interface ValidityState {
    readonly badInput: boolean;
    readonly customError: boolean;
    readonly patternMismatch: boolean;
    readonly rangeOverflow: boolean;
    readonly rangeUnderflow: boolean;
    readonly stepMismatch: boolean;
    readonly tooLong: boolean;
    readonly tooShort: boolean;
    readonly typeMismatch: boolean;
    readonly valid: boolean;
    readonly valueMissing: boolean;
}

declare var ValidityState: {
    prototype: ValidityState;
    new(): ValidityState;
};

interface VideoPlaybackQuality {
    readonly corruptedVideoFrames: number;
    readonly creationTime: number;
    readonly droppedVideoFrames: number;
    readonly totalFrameDelay: number;
    readonly totalVideoFrames: number;
}

declare var VideoPlaybackQuality: {
    prototype: VideoPlaybackQuality;
    new(): VideoPlaybackQuality;
};

interface VideoTrack {
    readonly id: string;
    kind: string;
    readonly label: string;
    language: string;
    selected: boolean;
    readonly sourceBuffer: SourceBuffer;
}

declare var VideoTrack: {
    prototype: VideoTrack;
    new(): VideoTrack;
};

interface VideoTrackListEventType {
    "addtrack": TrackEvent;
    "change": Event;
    "removetrack": TrackEvent;
}

interface VideoTrackList extends EventTarget {
    /*! @ooml-mapto(addEventListener) */ addVideoTrackListEventListener<T extends VideoTrackListEventType>(type: __Class<T>, listener: EventListener<VideoTrackList, T>, options?: boolean | AddEventListenerOptions): void;
    /*! @ooml-mapto(removeEventListener) */ removeVideoTrackListEventListener<T extends VideoTrackListEventType>(type: __Class<T>, listener: EventListener<VideoTrackList, T>, options?: boolean | EventListenerOptions): void;
    readonly length: number;
    readonly selectedIndex: number;
    getTrackById(id: string): VideoTrack | null;
    item(index: number): VideoTrack;


    [index: number]: VideoTrack;
}

declare var VideoTrackList: {
    prototype: VideoTrackList;
    new(): VideoTrackList;
};

interface WEBGL_color_buffer_float /*! @ooml-static */ {
  readonly FRAMEBUFFER_ATTACHMENT_COMPONENT_TYPE_EXT: number;
  readonly RGB32F_EXT: number;
  readonly RGBA32F_EXT: number;
  readonly UNSIGNED_NORMALIZED_EXT: number;
}

interface WEBGL_compressed_texture_astc /*! @ooml-static */ {
  readonly COMPRESSED_RGBA_ASTC_10x10_KHR: number;
  readonly COMPRESSED_RGBA_ASTC_10x5_KHR: number;
  readonly COMPRESSED_RGBA_ASTC_10x6_KHR: number;
  readonly COMPRESSED_RGBA_ASTC_10x8_KHR: number;
  readonly COMPRESSED_RGBA_ASTC_12x10_KHR: number;
  readonly COMPRESSED_RGBA_ASTC_12x12_KHR: number;
  readonly COMPRESSED_RGBA_ASTC_4x4_KHR: number;
  readonly COMPRESSED_RGBA_ASTC_5x4_KHR: number;
  readonly COMPRESSED_RGBA_ASTC_5x5_KHR: number;
  readonly COMPRESSED_RGBA_ASTC_6x5_KHR: number;
  readonly COMPRESSED_RGBA_ASTC_6x6_KHR: number;
  readonly COMPRESSED_RGBA_ASTC_8x5_KHR: number;
  readonly COMPRESSED_RGBA_ASTC_8x6_KHR: number;
  readonly COMPRESSED_RGBA_ASTC_8x8_KHR: number;
  readonly COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR: number;
  readonly COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR: number;
  readonly COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR: number;
  readonly COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR: number;
  readonly COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR: number;
  readonly COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR: number;
  readonly COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR: number;
  readonly COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR: number;
  readonly COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR: number;
  readonly COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR: number;
  readonly COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR: number;
  readonly COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR: number;
  readonly COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR: number;
  readonly COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR: number;
  getSupportedProfiles(): string[];
}

interface WEBGL_compressed_texture_s3tc {
}

declare var WEBGL_compressed_texture_s3tc: {
    prototype: WEBGL_compressed_texture_s3tc;
    new(): WEBGL_compressed_texture_s3tc;
    readonly COMPRESSED_RGBA_S3TC_DXT1_EXT: number;
    readonly COMPRESSED_RGBA_S3TC_DXT3_EXT: number;
    readonly COMPRESSED_RGBA_S3TC_DXT5_EXT: number;
    readonly COMPRESSED_RGB_S3TC_DXT1_EXT: number;
};

interface WEBGL_compressed_texture_s3tc_srgb /*! @ooml-static */ {
    readonly COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT: number;
    readonly COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT: number;
    readonly COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT: number;
    readonly COMPRESSED_SRGB_S3TC_DXT1_EXT: number;
}

interface WEBGL_debug_renderer_info {
}

declare var WEBGL_debug_renderer_info: {
    prototype: WEBGL_debug_renderer_info;
    new(): WEBGL_debug_renderer_info;
    readonly UNMASKED_RENDERER_WEBGL: number;
    readonly UNMASKED_VENDOR_WEBGL: number;
};

interface WEBGL_debug_shaders {
    getTranslatedShaderSource(shader: WebGLShader): string;
}

interface WEBGL_depth_texture {
}

declare var WEBGL_depth_texture: {
    prototype: WEBGL_depth_texture;
    new(): WEBGL_depth_texture;
    readonly UNSIGNED_INT_24_8_WEBGL: number;
};

interface WEBGL_draw_buffers /*! @ooml-static */ {
    readonly COLOR_ATTACHMENT0_WEBGL: number;
    readonly COLOR_ATTACHMENT10_WEBGL: number;
    readonly COLOR_ATTACHMENT11_WEBGL: number;
    readonly COLOR_ATTACHMENT12_WEBGL: number;
    readonly COLOR_ATTACHMENT13_WEBGL: number;
    readonly COLOR_ATTACHMENT14_WEBGL: number;
    readonly COLOR_ATTACHMENT15_WEBGL: number;
    readonly COLOR_ATTACHMENT1_WEBGL: number;
    readonly COLOR_ATTACHMENT2_WEBGL: number;
    readonly COLOR_ATTACHMENT3_WEBGL: number;
    readonly COLOR_ATTACHMENT4_WEBGL: number;
    readonly COLOR_ATTACHMENT5_WEBGL: number;
    readonly COLOR_ATTACHMENT6_WEBGL: number;
    readonly COLOR_ATTACHMENT7_WEBGL: number;
    readonly COLOR_ATTACHMENT8_WEBGL: number;
    readonly COLOR_ATTACHMENT9_WEBGL: number;
    readonly DRAW_BUFFER0_WEBGL: number;
    readonly DRAW_BUFFER10_WEBGL: number;
    readonly DRAW_BUFFER11_WEBGL: number;
    readonly DRAW_BUFFER12_WEBGL: number;
    readonly DRAW_BUFFER13_WEBGL: number;
    readonly DRAW_BUFFER14_WEBGL: number;
    readonly DRAW_BUFFER15_WEBGL: number;
    readonly DRAW_BUFFER1_WEBGL: number;
    readonly DRAW_BUFFER2_WEBGL: number;
    readonly DRAW_BUFFER3_WEBGL: number;
    readonly DRAW_BUFFER4_WEBGL: number;
    readonly DRAW_BUFFER5_WEBGL: number;
    readonly DRAW_BUFFER6_WEBGL: number;
    readonly DRAW_BUFFER7_WEBGL: number;
    readonly DRAW_BUFFER8_WEBGL: number;
    readonly DRAW_BUFFER9_WEBGL: number;
    readonly MAX_COLOR_ATTACHMENTS_WEBGL: number;
    readonly MAX_DRAW_BUFFERS_WEBGL: number;
    drawBuffersWEBGL(buffers: number[]): void;
}

interface WEBGL_lose_context {
    loseContext(): void;
    restoreContext(): void;
}

interface WaveShaperNode extends AudioNode {
    curve: Float32Array | null;
    oversample: OverSampleType;
}

declare var WaveShaperNode: {
    prototype: WaveShaperNode;
    new(): WaveShaperNode;
};

interface WebAuthentication {
    getAssertion(assertionChallenge: BufferSource | null, options?: AssertionOptions): Promise<WebAuthnAssertion>;
    makeCredential(accountInformation: Account, cryptoParameters: ScopedCredentialParameters[], attestationChallenge: BufferSource | null, options?: ScopedCredentialOptions): Promise<ScopedCredentialInfo>;
}

declare var WebAuthentication: {
    prototype: WebAuthentication;
    new(): WebAuthentication;
};

interface WebAuthnAssertion {
    readonly authenticatorData: ArrayBuffer;
    readonly clientData: ArrayBuffer;
    readonly credential: ScopedCredential;
    readonly signature: ArrayBuffer;
}

declare var WebAuthnAssertion: {
    prototype: WebAuthnAssertion;
    new(): WebAuthnAssertion;
};

interface WebGLActiveInfo {
    readonly name: string;
    readonly size: number;
    readonly type: number;
}

declare var WebGLActiveInfo: {
    prototype: WebGLActiveInfo;
    new(): WebGLActiveInfo;
};

interface WebGLBuffer extends WebGLObject {
}

declare var WebGLBuffer: {
    prototype: WebGLBuffer;
    new(): WebGLBuffer;
};

interface WebGLContextEvent extends Event {
    readonly statusMessage: string;
}

declare var WebGLContextEvent: {
    prototype: WebGLContextEvent;
    new(typeArg: string, eventInitDict?: WebGLContextEventInit): WebGLContextEvent;
};

interface WebGLFramebuffer extends WebGLObject {
}

declare var WebGLFramebuffer: {
    prototype: WebGLFramebuffer;
    new(): WebGLFramebuffer;
};

interface WebGLObject {
}

declare var WebGLObject: {
    prototype: WebGLObject;
    new(): WebGLObject;
};

interface WebGLProgram extends WebGLObject {
}

declare var WebGLProgram: {
    prototype: WebGLProgram;
    new(): WebGLProgram;
};

interface WebGLRenderbuffer extends WebGLObject {
}

declare var WebGLRenderbuffer: {
    prototype: WebGLRenderbuffer;
    new(): WebGLRenderbuffer;
};

interface WebGLRenderingContext {
    readonly canvas: HTMLCanvasElement;
    readonly drawingBufferHeight: number;
    readonly drawingBufferWidth: number;
    activeTexture(texture: number): void;
    attachShader(program: WebGLProgram | null, shader: WebGLShader | null): void;
    bindAttribLocation(program: WebGLProgram | null, index: number, name: string): void;
    bindBuffer(target: number, buffer: WebGLBuffer | null): void;
    bindFramebuffer(target: number, framebuffer: WebGLFramebuffer | null): void;
    bindRenderbuffer(target: number, renderbuffer: WebGLRenderbuffer | null): void;
    bindTexture(target: number, texture: WebGLTexture | null): void;
    blendColor(red: number, green: number, blue: number, alpha: number): void;
    blendEquation(mode: number): void;
    blendEquationSeparate(modeRGB: number, modeAlpha: number): void;
    blendFunc(sfactor: number, dfactor: number): void;
    blendFuncSeparate(srcRGB: number, dstRGB: number, srcAlpha: number, dstAlpha: number): void;
    bufferData(target: number, size: number | BufferSource | null, usage: number): void;
    bufferSubData(target: number, offset: number, data: BufferSource | null): void;
    checkFramebufferStatus(target: number): number;
    clear(mask: number): void;
    clearColor(red: number, green: number, blue: number, alpha: number): void;
    clearDepth(depth: number): void;
    clearStencil(s: number): void;
    colorMask(red: boolean, green: boolean, blue: boolean, alpha: boolean): void;
    compileShader(shader: WebGLShader | null): void;
    compressedTexImage2D(target: number, level: number, internalformat: number, width: number, height: number, border: number, data: ArrayBufferView | null): void;
    compressedTexSubImage2D(target: number, level: number, xoffset: number, yoffset: number, width: number, height: number, format: number, data: ArrayBufferView | null): void;
    copyTexImage2D(target: number, level: number, internalformat: number, x: number, y: number, width: number, height: number, border: number): void;
    copyTexSubImage2D(target: number, level: number, xoffset: number, yoffset: number, x: number, y: number, width: number, height: number): void;
    createBuffer(): WebGLBuffer | null;
    createFramebuffer(): WebGLFramebuffer | null;
    createProgram(): WebGLProgram | null;
    createRenderbuffer(): WebGLRenderbuffer | null;
    createShader(type: number): WebGLShader | null;
    createTexture(): WebGLTexture | null;
    cullFace(mode: number): void;
    deleteBuffer(buffer: WebGLBuffer | null): void;
    deleteFramebuffer(framebuffer: WebGLFramebuffer | null): void;
    deleteProgram(program: WebGLProgram | null): void;
    deleteRenderbuffer(renderbuffer: WebGLRenderbuffer | null): void;
    deleteShader(shader: WebGLShader | null): void;
    deleteTexture(texture: WebGLTexture | null): void;
    depthFunc(func: number): void;
    depthMask(flag: boolean): void;
    depthRange(zNear: number, zFar: number): void;
    detachShader(program: WebGLProgram | null, shader: WebGLShader | null): void;
    disable(cap: number): void;
    disableVertexAttribArray(index: number): void;
    drawArrays(mode: number, first: number, count: number): void;
    drawElements(mode: number, count: number, type: number, offset: number): void;
    enable(cap: number): void;
    enableVertexAttribArray(index: number): void;
    finish(): void;
    flush(): void;
    framebufferRenderbuffer(target: number, attachment: number, renderbuffertarget: number, renderbuffer: WebGLRenderbuffer | null): void;
    framebufferTexture2D(target: number, attachment: number, textarget: number, texture: WebGLTexture | null, level: number): void;
    frontFace(mode: number): void;
    generateMipmap(target: number): void;
    getActiveAttrib(program: WebGLProgram | null, index: number): WebGLActiveInfo | null;
    getActiveUniform(program: WebGLProgram | null, index: number): WebGLActiveInfo | null;
    getAttachedShaders(program: WebGLProgram | null): WebGLShader[] | null;
    getAttribLocation(program: WebGLProgram | null, name: string): number;
    getBufferParameter(target: number, pname: number): any;
    getContextAttributes(): WebGLContextAttributes;
    getError(): number;
    getExtension(extensionName: string): any;
    getFramebufferAttachmentParameter(target: number, attachment: number, pname: number): any;
    getParameter(pname: number): any;
    getProgramInfoLog(program: WebGLProgram | null): string | null;
    getProgramParameter(program: WebGLProgram | null, pname: number): any;
    getRenderbufferParameter(target: number, pname: number): any;
    getShaderInfoLog(shader: WebGLShader | null): string | null;
    getShaderParameter(shader: WebGLShader | null, pname: number): any;
    getShaderPrecisionFormat(shadertype: number, precisiontype: number): WebGLShaderPrecisionFormat | null;
    getShaderSource(shader: WebGLShader | null): string | null;
    getSupportedExtensions(): string[] | null;
    getTexParameter(target: number, pname: number): any;
    getUniform(program: WebGLProgram | null, location: WebGLUniformLocation | null): any;
    getUniformLocation(program: WebGLProgram | null, name: string): WebGLUniformLocation | null;
    getVertexAttrib(index: number, pname: number): any;
    getVertexAttribOffset(index: number, pname: number): number;
    hint(target: number, mode: number): void;
    isBuffer(buffer: WebGLBuffer | null): boolean;
    isContextLost(): boolean;
    isEnabled(cap: number): boolean;
    isFramebuffer(framebuffer: WebGLFramebuffer | null): boolean;
    isProgram(program: WebGLProgram | null): boolean;
    isRenderbuffer(renderbuffer: WebGLRenderbuffer | null): boolean;
    isShader(shader: WebGLShader | null): boolean;
    isTexture(texture: WebGLTexture | null): boolean;
    lineWidth(width: number): void;
    linkProgram(program: WebGLProgram | null): void;
    pixelStorei(pname: number, param: number | boolean): void;
    polygonOffset(factor: number, units: number): void;
    readPixels(x: number, y: number, width: number, height: number, format: number, type: number, pixels: ArrayBufferView | null): void;
    renderbufferStorage(target: number, internalformat: number, width: number, height: number): void;
    sampleCoverage(value: number, invert: boolean): void;
    scissor(x: number, y: number, width: number, height: number): void;
    shaderSource(shader: WebGLShader | null, source: string): void;
    stencilFunc(func: number, ref: number, mask: number): void;
    stencilFuncSeparate(face: number, func: number, ref: number, mask: number): void;
    stencilMask(mask: number): void;
    stencilMaskSeparate(face: number, mask: number): void;
    stencilOp(fail: number, zfail: number, zpass: number): void;
    stencilOpSeparate(face: number, fail: number, zfail: number, zpass: number): void;
    texImage2D(target: number, level: number, internalformat: number, width: number, height: number, border: number, format: number, type: number, pixels: ArrayBufferView | null): void;
    texImage2D(target: number, level: number, internalformat: number, format: number, type: number, pixels: ImageBitmap | ImageData | HTMLVideoElement | HTMLImageElement | HTMLCanvasElement): void;
    texParameterf(target: number, pname: number, param: number): void;
    texParameteri(target: number, pname: number, param: number): void;
    texSubImage2D(target: number, level: number, xoffset: number, yoffset: number, width: number, height: number, format: number, type: number, pixels: ArrayBufferView | null): void;
    texSubImage2D(target: number, level: number, xoffset: number, yoffset: number, format: number, type: number, pixels: ImageBitmap | ImageData | HTMLVideoElement | HTMLImageElement | HTMLCanvasElement): void;
    uniform1f(location: WebGLUniformLocation | null, x: number): void;
    uniform1fv(location: WebGLUniformLocation | null, v: Float32Array | Array<number>): void;
    uniform1i(location: WebGLUniformLocation | null, x: number): void;
    uniform1iv(location: WebGLUniformLocation | null, v: Int32Array | Array<number>): void;
    uniform2f(location: WebGLUniformLocation | null, x: number, y: number): void;
    uniform2fv(location: WebGLUniformLocation | null, v: Float32Array | Array<number>): void;
    uniform2i(location: WebGLUniformLocation | null, x: number, y: number): void;
    uniform2iv(location: WebGLUniformLocation | null, v: Int32Array | Array<number>): void;
    uniform3f(location: WebGLUniformLocation | null, x: number, y: number, z: number): void;
    uniform3fv(location: WebGLUniformLocation | null, v: Float32Array | Array<number>): void;
    uniform3i(location: WebGLUniformLocation | null, x: number, y: number, z: number): void;
    uniform3iv(location: WebGLUniformLocation | null, v: Int32Array | Array<number>): void;
    uniform4f(location: WebGLUniformLocation | null, x: number, y: number, z: number, w: number): void;
    uniform4fv(location: WebGLUniformLocation | null, v: Float32Array | Array<number>): void;
    uniform4i(location: WebGLUniformLocation | null, x: number, y: number, z: number, w: number): void;
    uniform4iv(location: WebGLUniformLocation | null, v: Int32Array | Array<number>): void;
    uniformMatrix2fv(location: WebGLUniformLocation | null, transpose: boolean, value: Float32Array | Array<number>): void;
    uniformMatrix3fv(location: WebGLUniformLocation | null, transpose: boolean, value: Float32Array | Array<number>): void;
    uniformMatrix4fv(location: WebGLUniformLocation | null, transpose: boolean, value: Float32Array | Array<number>): void;
    useProgram(program: WebGLProgram | null): void;
    validateProgram(program: WebGLProgram | null): void;
    vertexAttrib1f(indx: number, x: number): void;
    vertexAttrib1fv(indx: number, values: Float32Array | number[]): void;
    vertexAttrib2f(indx: number, x: number, y: number): void;
    vertexAttrib2fv(indx: number, values: Float32Array | number[]): void;
    vertexAttrib3f(indx: number, x: number, y: number, z: number): void;
    vertexAttrib3fv(indx: number, values: Float32Array | number[]): void;
    vertexAttrib4f(indx: number, x: number, y: number, z: number, w: number): void;
    vertexAttrib4fv(indx: number, values: Float32Array | number[]): void;
    vertexAttribPointer(indx: number, size: number, type: number, normalized: boolean, stride: number, offset: number): void;
    viewport(x: number, y: number, width: number, height: number): void;
}

declare var WebGLRenderingContext: {
    prototype: WebGLRenderingContext;
    new(): WebGLRenderingContext;
    readonly ACTIVE_ATTRIBUTES: number;
    readonly ACTIVE_TEXTURE: number;
    readonly ACTIVE_UNIFORMS: number;
    readonly ALIASED_LINE_WIDTH_RANGE: number;
    readonly ALIASED_POINT_SIZE_RANGE: number;
    readonly ALPHA: number;
    readonly ALPHA_BITS: number;
    readonly ALWAYS: number;
    readonly ARRAY_BUFFER: number;
    readonly ARRAY_BUFFER_BINDING: number;
    readonly ATTACHED_SHADERS: number;
    readonly BACK: number;
    readonly BLEND: number;
    readonly BLEND_COLOR: number;
    readonly BLEND_DST_ALPHA: number;
    readonly BLEND_DST_RGB: number;
    readonly BLEND_EQUATION: number;
    readonly BLEND_EQUATION_ALPHA: number;
    readonly BLEND_EQUATION_RGB: number;
    readonly BLEND_SRC_ALPHA: number;
    readonly BLEND_SRC_RGB: number;
    readonly BLUE_BITS: number;
    readonly BOOL: number;
    readonly BOOL_VEC2: number;
    readonly BOOL_VEC3: number;
    readonly BOOL_VEC4: number;
    readonly BROWSER_DEFAULT_WEBGL: number;
    readonly BUFFER_SIZE: number;
    readonly BUFFER_USAGE: number;
    readonly BYTE: number;
    readonly CCW: number;
    readonly CLAMP_TO_EDGE: number;
    readonly COLOR_ATTACHMENT0: number;
    readonly COLOR_BUFFER_BIT: number;
    readonly COLOR_CLEAR_VALUE: number;
    readonly COLOR_WRITEMASK: number;
    readonly COMPILE_STATUS: number;
    readonly COMPRESSED_TEXTURE_FORMATS: number;
    readonly CONSTANT_ALPHA: number;
    readonly CONSTANT_COLOR: number;
    readonly CONTEXT_LOST_WEBGL: number;
    readonly CULL_FACE: number;
    readonly CULL_FACE_MODE: number;
    readonly CURRENT_PROGRAM: number;
    readonly CURRENT_VERTEX_ATTRIB: number;
    readonly CW: number;
    readonly DECR: number;
    readonly DECR_WRAP: number;
    readonly DELETE_STATUS: number;
    readonly DEPTH_ATTACHMENT: number;
    readonly DEPTH_BITS: number;
    readonly DEPTH_BUFFER_BIT: number;
    readonly DEPTH_CLEAR_VALUE: number;
    readonly DEPTH_COMPONENT: number;
    readonly DEPTH_COMPONENT16: number;
    readonly DEPTH_FUNC: number;
    readonly DEPTH_RANGE: number;
    readonly DEPTH_STENCIL: number;
    readonly DEPTH_STENCIL_ATTACHMENT: number;
    readonly DEPTH_TEST: number;
    readonly DEPTH_WRITEMASK: number;
    readonly DITHER: number;
    readonly DONT_CARE: number;
    readonly DST_ALPHA: number;
    readonly DST_COLOR: number;
    readonly DYNAMIC_DRAW: number;
    readonly ELEMENT_ARRAY_BUFFER: number;
    readonly ELEMENT_ARRAY_BUFFER_BINDING: number;
    readonly EQUAL: number;
    readonly FASTEST: number;
    readonly FLOAT: number;
    readonly FLOAT_MAT2: number;
    readonly FLOAT_MAT3: number;
    readonly FLOAT_MAT4: number;
    readonly FLOAT_VEC2: number;
    readonly FLOAT_VEC3: number;
    readonly FLOAT_VEC4: number;
    readonly FRAGMENT_SHADER: number;
    readonly FRAMEBUFFER: number;
    readonly FRAMEBUFFER_ATTACHMENT_OBJECT_NAME: number;
    readonly FRAMEBUFFER_ATTACHMENT_OBJECT_TYPE: number;
    readonly FRAMEBUFFER_ATTACHMENT_TEXTURE_CUBE_MAP_FACE: number;
    readonly FRAMEBUFFER_ATTACHMENT_TEXTURE_LEVEL: number;
    readonly FRAMEBUFFER_BINDING: number;
    readonly FRAMEBUFFER_COMPLETE: number;
    readonly FRAMEBUFFER_INCOMPLETE_ATTACHMENT: number;
    readonly FRAMEBUFFER_INCOMPLETE_DIMENSIONS: number;
    readonly FRAMEBUFFER_INCOMPLETE_MISSING_ATTACHMENT: number;
    readonly FRAMEBUFFER_UNSUPPORTED: number;
    readonly FRONT: number;
    readonly FRONT_AND_BACK: number;
    readonly FRONT_FACE: number;
    readonly FUNC_ADD: number;
    readonly FUNC_REVERSE_SUBTRACT: number;
    readonly FUNC_SUBTRACT: number;
    readonly GENERATE_MIPMAP_HINT: number;
    readonly GEQUAL: number;
    readonly GREATER: number;
    readonly GREEN_BITS: number;
    readonly HIGH_FLOAT: number;
    readonly HIGH_INT: number;
    readonly IMPLEMENTATION_COLOR_READ_FORMAT: number;
    readonly IMPLEMENTATION_COLOR_READ_TYPE: number;
    readonly INCR: number;
    readonly INCR_WRAP: number;
    readonly INT: number;
    readonly INT_VEC2: number;
    readonly INT_VEC3: number;
    readonly INT_VEC4: number;
    readonly INVALID_ENUM: number;
    readonly INVALID_FRAMEBUFFER_OPERATION: number;
    readonly INVALID_OPERATION: number;
    readonly INVALID_VALUE: number;
    readonly INVERT: number;
    readonly KEEP: number;
    readonly LEQUAL: number;
    readonly LESS: number;
    readonly LINEAR: number;
    readonly LINEAR_MIPMAP_LINEAR: number;
    readonly LINEAR_MIPMAP_NEAREST: number;
    readonly LINES: number;
    readonly LINE_LOOP: number;
    readonly LINE_STRIP: number;
    readonly LINE_WIDTH: number;
    readonly LINK_STATUS: number;
    readonly LOW_FLOAT: number;
    readonly LOW_INT: number;
    readonly LUMINANCE: number;
    readonly LUMINANCE_ALPHA: number;
    readonly MAX_COMBINED_TEXTURE_IMAGE_UNITS: number;
    readonly MAX_CUBE_MAP_TEXTURE_SIZE: number;
    readonly MAX_FRAGMENT_UNIFORM_VECTORS: number;
    readonly MAX_RENDERBUFFER_SIZE: number;
    readonly MAX_TEXTURE_IMAGE_UNITS: number;
    readonly MAX_TEXTURE_SIZE: number;
    readonly MAX_VARYING_VECTORS: number;
    readonly MAX_VERTEX_ATTRIBS: number;
    readonly MAX_VERTEX_TEXTURE_IMAGE_UNITS: number;
    readonly MAX_VERTEX_UNIFORM_VECTORS: number;
    readonly MAX_VIEWPORT_DIMS: number;
    readonly MEDIUM_FLOAT: number;
    readonly MEDIUM_INT: number;
    readonly MIRRORED_REPEAT: number;
    readonly NEAREST: number;
    readonly NEAREST_MIPMAP_LINEAR: number;
    readonly NEAREST_MIPMAP_NEAREST: number;
    readonly NEVER: number;
    readonly NICEST: number;
    readonly NONE: number;
    readonly NOTEQUAL: number;
    readonly NO_ERROR: number;
    readonly ONE: number;
    readonly ONE_MINUS_CONSTANT_ALPHA: number;
    readonly ONE_MINUS_CONSTANT_COLOR: number;
    readonly ONE_MINUS_DST_ALPHA: number;
    readonly ONE_MINUS_DST_COLOR: number;
    readonly ONE_MINUS_SRC_ALPHA: number;
    readonly ONE_MINUS_SRC_COLOR: number;
    readonly OUT_OF_MEMORY: number;
    readonly PACK_ALIGNMENT: number;
    readonly POINTS: number;
    readonly POLYGON_OFFSET_FACTOR: number;
    readonly POLYGON_OFFSET_FILL: number;
    readonly POLYGON_OFFSET_UNITS: number;
    readonly RED_BITS: number;
    readonly RENDERBUFFER: number;
    readonly RENDERBUFFER_ALPHA_SIZE: number;
    readonly RENDERBUFFER_BINDING: number;
    readonly RENDERBUFFER_BLUE_SIZE: number;
    readonly RENDERBUFFER_DEPTH_SIZE: number;
    readonly RENDERBUFFER_GREEN_SIZE: number;
    readonly RENDERBUFFER_HEIGHT: number;
    readonly RENDERBUFFER_INTERNAL_FORMAT: number;
    readonly RENDERBUFFER_RED_SIZE: number;
    readonly RENDERBUFFER_STENCIL_SIZE: number;
    readonly RENDERBUFFER_WIDTH: number;
    readonly RENDERER: number;
    readonly REPEAT: number;
    readonly REPLACE: number;
    readonly RGB: number;
    readonly RGB565: number;
    readonly RGB5_A1: number;
    readonly RGBA: number;
    readonly RGBA4: number;
    readonly SAMPLER_2D: number;
    readonly SAMPLER_CUBE: number;
    readonly SAMPLES: number;
    readonly SAMPLE_ALPHA_TO_COVERAGE: number;
    readonly SAMPLE_BUFFERS: number;
    readonly SAMPLE_COVERAGE: number;
    readonly SAMPLE_COVERAGE_INVERT: number;
    readonly SAMPLE_COVERAGE_VALUE: number;
    readonly SCISSOR_BOX: number;
    readonly SCISSOR_TEST: number;
    readonly SHADER_TYPE: number;
    readonly SHADING_LANGUAGE_VERSION: number;
    readonly SHORT: number;
    readonly SRC_ALPHA: number;
    readonly SRC_ALPHA_SATURATE: number;
    readonly SRC_COLOR: number;
    readonly STATIC_DRAW: number;
    readonly STENCIL_ATTACHMENT: number;
    readonly STENCIL_BACK_FAIL: number;
    readonly STENCIL_BACK_FUNC: number;
    readonly STENCIL_BACK_PASS_DEPTH_FAIL: number;
    readonly STENCIL_BACK_PASS_DEPTH_PASS: number;
    readonly STENCIL_BACK_REF: number;
    readonly STENCIL_BACK_VALUE_MASK: number;
    readonly STENCIL_BACK_WRITEMASK: number;
    readonly STENCIL_BITS: number;
    readonly STENCIL_BUFFER_BIT: number;
    readonly STENCIL_CLEAR_VALUE: number;
    readonly STENCIL_FAIL: number;
    readonly STENCIL_FUNC: number;
    readonly STENCIL_INDEX: number;
    readonly STENCIL_INDEX8: number;
    readonly STENCIL_PASS_DEPTH_FAIL: number;
    readonly STENCIL_PASS_DEPTH_PASS: number;
    readonly STENCIL_REF: number;
    readonly STENCIL_TEST: number;
    readonly STENCIL_VALUE_MASK: number;
    readonly STENCIL_WRITEMASK: number;
    readonly STREAM_DRAW: number;
    readonly SUBPIXEL_BITS: number;
    readonly TEXTURE: number;
    readonly TEXTURE0: number;
    readonly TEXTURE1: number;
    readonly TEXTURE10: number;
    readonly TEXTURE11: number;
    readonly TEXTURE12: number;
    readonly TEXTURE13: number;
    readonly TEXTURE14: number;
    readonly TEXTURE15: number;
    readonly TEXTURE16: number;
    readonly TEXTURE17: number;
    readonly TEXTURE18: number;
    readonly TEXTURE19: number;
    readonly TEXTURE2: number;
    readonly TEXTURE20: number;
    readonly TEXTURE21: number;
    readonly TEXTURE22: number;
    readonly TEXTURE23: number;
    readonly TEXTURE24: number;
    readonly TEXTURE25: number;
    readonly TEXTURE26: number;
    readonly TEXTURE27: number;
    readonly TEXTURE28: number;
    readonly TEXTURE29: number;
    readonly TEXTURE3: number;
    readonly TEXTURE30: number;
    readonly TEXTURE31: number;
    readonly TEXTURE4: number;
    readonly TEXTURE5: number;
    readonly TEXTURE6: number;
    readonly TEXTURE7: number;
    readonly TEXTURE8: number;
    readonly TEXTURE9: number;
    readonly TEXTURE_2D: number;
    readonly TEXTURE_BINDING_2D: number;
    readonly TEXTURE_BINDING_CUBE_MAP: number;
    readonly TEXTURE_CUBE_MAP: number;
    readonly TEXTURE_CUBE_MAP_NEGATIVE_X: number;
    readonly TEXTURE_CUBE_MAP_NEGATIVE_Y: number;
    readonly TEXTURE_CUBE_MAP_NEGATIVE_Z: number;
    readonly TEXTURE_CUBE_MAP_POSITIVE_X: number;
    readonly TEXTURE_CUBE_MAP_POSITIVE_Y: number;
    readonly TEXTURE_CUBE_MAP_POSITIVE_Z: number;
    readonly TEXTURE_MAG_FILTER: number;
    readonly TEXTURE_MIN_FILTER: number;
    readonly TEXTURE_WRAP_S: number;
    readonly TEXTURE_WRAP_T: number;
    readonly TRIANGLES: number;
    readonly TRIANGLE_FAN: number;
    readonly TRIANGLE_STRIP: number;
    readonly UNPACK_ALIGNMENT: number;
    readonly UNPACK_COLORSPACE_CONVERSION_WEBGL: number;
    readonly UNPACK_FLIP_Y_WEBGL: number;
    readonly UNPACK_PREMULTIPLY_ALPHA_WEBGL: number;
    readonly UNSIGNED_BYTE: number;
    readonly UNSIGNED_INT: number;
    readonly UNSIGNED_SHORT: number;
    readonly UNSIGNED_SHORT_4_4_4_4: number;
    readonly UNSIGNED_SHORT_5_5_5_1: number;
    readonly UNSIGNED_SHORT_5_6_5: number;
    readonly VALIDATE_STATUS: number;
    readonly VENDOR: number;
    readonly VERSION: number;
    readonly VERTEX_ATTRIB_ARRAY_BUFFER_BINDING: number;
    readonly VERTEX_ATTRIB_ARRAY_ENABLED: number;
    readonly VERTEX_ATTRIB_ARRAY_NORMALIZED: number;
    readonly VERTEX_ATTRIB_ARRAY_POINTER: number;
    readonly VERTEX_ATTRIB_ARRAY_SIZE: number;
    readonly VERTEX_ATTRIB_ARRAY_STRIDE: number;
    readonly VERTEX_ATTRIB_ARRAY_TYPE: number;
    readonly VERTEX_SHADER: number;
    readonly VIEWPORT: number;
    readonly ZERO: number;
};

interface WebGLShader extends WebGLObject {
}

declare var WebGLShader: {
    prototype: WebGLShader;
    new(): WebGLShader;
};

interface WebGLShaderPrecisionFormat {
    readonly precision: number;
    readonly rangeMax: number;
    readonly rangeMin: number;
}

declare var WebGLShaderPrecisionFormat: {
    prototype: WebGLShaderPrecisionFormat;
    new(): WebGLShaderPrecisionFormat;
};

interface WebGLTexture extends WebGLObject {
}

declare var WebGLTexture: {
    prototype: WebGLTexture;
    new(): WebGLTexture;
};

interface WebGLUniformLocation {
}

declare var WebGLUniformLocation: {
    prototype: WebGLUniformLocation;
    new(): WebGLUniformLocation;
};

interface WebGLVertexArrayObjectOES {
}

interface WebKitCSSMatrix {
    a: number;
    b: number;
    c: number;
    d: number;
    e: number;
    f: number;
    m11: number;
    m12: number;
    m13: number;
    m14: number;
    m21: number;
    m22: number;
    m23: number;
    m24: number;
    m31: number;
    m32: number;
    m33: number;
    m34: number;
    m41: number;
    m42: number;
    m43: number;
    m44: number;
    inverse(): WebKitCSSMatrix;
    multiply(secondMatrix: WebKitCSSMatrix): WebKitCSSMatrix;
    rotate(angleX: number, angleY?: number, angleZ?: number): WebKitCSSMatrix;
    rotateAxisAngle(x: number, y: number, z: number, angle: number): WebKitCSSMatrix;
    scale(scaleX: number, scaleY?: number, scaleZ?: number): WebKitCSSMatrix;
    setMatrixValue(value: string): void;
    skewX(angle: number): WebKitCSSMatrix;
    skewY(angle: number): WebKitCSSMatrix;
    translate(x: number, y: number, z?: number): WebKitCSSMatrix;
}

declare var WebKitCSSMatrix: {
    prototype: WebKitCSSMatrix;
    new(text?: string): WebKitCSSMatrix;
};

interface WebKitDirectoryEntry extends WebKitEntry {
    createReader(): WebKitDirectoryReader;
}

declare var WebKitDirectoryEntry: {
    prototype: WebKitDirectoryEntry;
    new(): WebKitDirectoryEntry;
};

interface WebKitDirectoryReader {
    readEntries(successCallback: WebKitEntriesCallback, errorCallback?: WebKitErrorCallback): void;
}

declare var WebKitDirectoryReader: {
    prototype: WebKitDirectoryReader;
    new(): WebKitDirectoryReader;
};

interface WebKitEntry {
    readonly filesystem: WebKitFileSystem;
    readonly fullPath: string;
    readonly isDirectory: boolean;
    readonly isFile: boolean;
    readonly name: string;
}

declare var WebKitEntry: {
    prototype: WebKitEntry;
    new(): WebKitEntry;
};

interface WebKitFileEntry extends WebKitEntry {
    file(successCallback: WebKitFileCallback, errorCallback?: WebKitErrorCallback): void;
}

declare var WebKitFileEntry: {
    prototype: WebKitFileEntry;
    new(): WebKitFileEntry;
};

interface WebKitFileSystem {
    readonly name: string;
    readonly root: WebKitDirectoryEntry;
}

declare var WebKitFileSystem: {
    prototype: WebKitFileSystem;
    new(): WebKitFileSystem;
};

interface WebKitPoint {
    x: number;
    y: number;
}

declare var WebKitPoint: {
    prototype: WebKitPoint;
    new(x?: number, y?: number): WebKitPoint;
};

interface WebSocketEventType {
    "close": CloseEvent;
    "error": Event;
    "message": MessageEvent;
    "open": Event;
}

interface WebSocket extends EventTarget {
    /*! @ooml-mapto(addEventListener) */ addWebSocketEventListener<T extends WebSocketEventType>(type: __Class<T>, listener: EventListener<WebSocket, T>, options?: boolean | AddEventListenerOptions): void;
    /*! @ooml-mapto(removeEventListener) */ removeWebSocketEventListener<T extends WebSocketEventType>(type: __Class<T>, listener: EventListener<WebSocket, T>, options?: boolean | EventListenerOptions): void;
    binaryType: BinaryType;
    readonly bufferedAmount: number;
    readonly extensions: string;
    readonly protocol: string;
    readonly readyState: number;
    readonly url: string;
    close(code?: number, reason?: string): void;
    send(data: string | BufferSource | Blob): void;
}

declare var WebSocket: {
    prototype: WebSocket;
    new(url: string, protocols?: string | string[]): WebSocket;
    readonly CLOSED: number;
    readonly CLOSING: number;
    readonly CONNECTING: number;
    readonly OPEN: number;
};

interface WheelEvent extends MouseEvent {
    readonly deltaMode: number;
    readonly deltaX: number;
    readonly deltaY: number;
    readonly deltaZ: number;
    readonly wheelDelta: number;
    readonly wheelDeltaX: number;
    readonly wheelDeltaY: number;
    getCurrentPoint(element: Element): void;
    initWheelEvent(typeArg: string, canBubbleArg: boolean, cancelableArg: boolean, viewArg: Window, detailArg: number, screenXArg: number, screenYArg: number, clientXArg: number, clientYArg: number, buttonArg: number, relatedTargetArg: EventTarget, modifiersListArg: string, deltaXArg: number, deltaYArg: number, deltaZArg: number, deltaMode: number): void;
}

declare var WheelEvent: {
    prototype: WheelEvent;
    new(typeArg: string, eventInitDict?: WheelEventInit): WheelEvent;
    readonly DOM_DELTA_LINE: number;
    readonly DOM_DELTA_PAGE: number;
    readonly DOM_DELTA_PIXEL: number;
};

interface WindowEventType extends GlobalEventHandlersEventType {
    "abort": UIEvent;
    "afterprint": Event;
    "beforeprint": Event;
    "beforeunload": BeforeUnloadEvent;
    "blur": FocusEvent;
    "canplay": Event;
    "canplaythrough": Event;
    "change": Event;
    "click": MouseEvent;
    "compassneedscalibration": Event;
    "contextmenu": PointerEvent;
    "dblclick": MouseEvent;
    "devicelight": DeviceLightEvent;
    "devicemotion": DeviceMotionEvent;
    "deviceorientation": DeviceOrientationEvent;
    "drag": DragEvent;
    "dragend": DragEvent;
    "dragenter": DragEvent;
    "dragleave": DragEvent;
    "dragover": DragEvent;
    "dragstart": DragEvent;
    "drop": DragEvent;
    "durationchange": Event;
    "emptied": Event;
    "ended": Event;
    "error": ErrorEvent;
    "focus": FocusEvent;
    "hashchange": HashChangeEvent;
    "input": Event;
    "invalid": Event;
    "keydown": KeyboardEvent;
    "keypress": KeyboardEvent;
    "keyup": KeyboardEvent;
    "load": Event;
    "loadeddata": Event;
    "loadedmetadata": Event;
    "loadstart": Event;
    "message": MessageEvent;
    "mousedown": MouseEvent;
    "mouseenter": MouseEvent;
    "mouseleave": MouseEvent;
    "mousemove": MouseEvent;
    "mouseout": MouseEvent;
    "mouseover": MouseEvent;
    "mouseup": MouseEvent;
    "mousewheel": WheelEvent;
    "MSGestureChange": Event;
    "MSGestureDoubleTap": Event;
    "MSGestureEnd": Event;
    "MSGestureHold": Event;
    "MSGestureStart": Event;
    "MSGestureTap": Event;
    "MSInertiaStart": Event;
    "MSPointerCancel": Event;
    "MSPointerDown": Event;
    "MSPointerEnter": Event;
    "MSPointerLeave": Event;
    "MSPointerMove": Event;
    "MSPointerOut": Event;
    "MSPointerOver": Event;
    "MSPointerUp": Event;
    "offline": Event;
    "online": Event;
    "orientationchange": Event;
    "pagehide": PageTransitionEvent;
    "pageshow": PageTransitionEvent;
    "pause": Event;
    "play": Event;
    "playing": Event;
    "popstate": PopStateEvent;
    "progress": ProgressEvent;
    "ratechange": Event;
    "readystatechange": ProgressEvent;
    "reset": Event;
    "resize": UIEvent;
    "scroll": UIEvent;
    "seeked": Event;
    "seeking": Event;
    "select": UIEvent;
    "stalled": Event;
    "storage": StorageEvent;
    "submit": Event;
    "suspend": Event;
    "timeupdate": Event;
    "touchcancel": TouchEvent;
    "touchend": TouchEvent;
    "touchmove": TouchEvent;
    "touchstart": TouchEvent;
    "unload": Event;
    "volumechange": Event;
    "vrdisplayactivate": Event;
    "vrdisplayblur": Event;
    "vrdisplayconnect": Event;
    "vrdisplaydeactivate": Event;
    "vrdisplaydisconnect": Event;
    "vrdisplayfocus": Event;
    "vrdisplaypointerrestricted": Event;
    "vrdisplaypointerunrestricted": Event;
    "vrdisplaypresentchange": Event;
    "waiting": Event;
}

interface Window extends EventTarget, GlobalEventHandlers {
    /*! @ooml-mapto(addEventListener) */ addWindowEventListener<T extends WindowEventType>(type: __Class<T>, listener: EventListener<Window, T>, options?: boolean | AddEventListenerOptions): void;
    /*! @ooml-mapto(removeEventListener) */ removeWindowEventListener<T extends WindowEventType>(type: __Class<T>, listener: EventListener<Window, T>, options?: boolean | EventListenerOptions): void;
  clearInterval(handle: number): void;
  clearTimeout(handle: number): void;
  setInterval(handler: (...args: any[]) => void, timeout: number): number;
  setTimeout(handler: (...args: any[]) => void, timeout: number): number;
  fetch(input?: Request | string, init?: RequestInit): Promise<Response>;
  atob(encodedString: string): string;
  btoa(rawString: string): string;
  readonly indexedDB: IDBFactory;
  readonly console: Console;
  readonly localStorage: Storage;
  readonly sessionStorage: Storage;
    Blob: Blob;
    URL: URL;
    URLSearchParams: URLSearchParams;
    readonly applicationCache: ApplicationCache;
    readonly caches: CacheStorage;
    readonly clientInformation: Navigator;
    readonly closed: boolean;
    readonly crypto: Crypto;
    defaultStatus: string;
    readonly devicePixelRatio: number;
    readonly doNotTrack: string;
    readonly document: Document;
    event: Event | null;
    readonly external: External;
    readonly frameElement: Element;
    readonly frames: Window;
    readonly history: History;
    readonly innerHeight: number;
    readonly innerWidth: number;
    readonly isSecureContext: boolean;
    readonly length: number;
    location: Location;
    readonly locationbar: BarProp;
    readonly menubar: BarProp;
    readonly msCredentials: MSCredentials;
    name: string;
    readonly navigator: Navigator;
    offscreenBuffering: string | boolean;
    opener: any;
    readonly orientation: string | number;
    readonly outerHeight: number;
    readonly outerWidth: number;
    readonly pageXOffset: number;
    readonly pageYOffset: number;
    readonly parent: Window;
    readonly performance: Performance;
    readonly personalbar: BarProp;
    readonly screen: Screen;
    readonly screenLeft: number;
    readonly screenTop: number;
    readonly screenX: number;
    readonly screenY: number;
    readonly scrollX: number;
    readonly scrollY: number;
    readonly scrollbars: BarProp;
    readonly self: Window;
    readonly speechSynthesis: SpeechSynthesis;
    status: string;
    readonly statusbar: BarProp;
    readonly styleMedia: StyleMedia;
    readonly toolbar: BarProp;
    readonly top: Window;
    readonly window: Window;
    alert(message?: any): void;
    blur(): void;
    cancelAnimationFrame(handle: number): void;
    captureEvents(): void;
    close(): void;
    confirm(message?: string): boolean;
    createImageBitmap(image: HTMLImageElement | SVGImageElement | HTMLVideoElement | HTMLCanvasElement | ImageBitmap | ImageData | Blob, options?: ImageBitmapOptions): Promise<ImageBitmap>;
    createImageBitmap(image: HTMLImageElement | SVGImageElement | HTMLVideoElement | HTMLCanvasElement | ImageBitmap | ImageData | Blob, sx: number, sy: number, sw: number, sh: number, options?: ImageBitmapOptions): Promise<ImageBitmap>;
    departFocus(navigationReason: NavigationReason, origin: FocusNavigationOrigin): void;
    focus(): void;
    getComputedStyle(elt: Element, pseudoElt?: string | null): CSSStyleDeclaration;
    getMatchedCSSRules(elt: Element, pseudoElt?: string | null): CSSRuleList;
    getSelection(): Selection;
    matchMedia(mediaQuery: string): MediaQueryList;
    moveBy(x?: number, y?: number): void;
    moveTo(x?: number, y?: number): void;
    msWriteProfilerMark(profilerMarkName: string): void;
    open(url?: string, target?: string, features?: string, replace?: boolean): Window | null;
    postMessage(message: any, targetOrigin: string, transfer?: any[]): void;
    print(): void;
    prompt(message?: string, _default?: string): string | null;
    releaseEvents(): void;
    requestAnimationFrame(callback: FrameRequestCallback): number;
    resizeBy(x?: number, y?: number): void;
    resizeTo(x?: number, y?: number): void;
    scroll(options: ScrollToOptions): void;
    scroll(x?: number, y?: number): void;
    scrollBy(options: ScrollToOptions): void;
    scrollBy(x?: number, y?: number): void;
    scrollTo(options: ScrollToOptions): void;
    scrollTo(x?: number, y?: number): void;
    stop(): void;
    webkitCancelAnimationFrame(handle: number): void;
    webkitConvertPointFromNodeToPage(node: Node, pt: WebKitPoint): WebKitPoint;
    webkitConvertPointFromPageToNode(node: Node, pt: WebKitPoint): WebKitPoint;
    webkitRequestAnimationFrame(callback: FrameRequestCallback): number;
}

declare var Window: {
    prototype: Window;
    new(): Window;
};

interface WindowEventHandlersEventType {
    "afterprint": Event;
    "beforeprint": Event;
    "beforeunload": BeforeUnloadEvent;
    "hashchange": HashChangeEvent;
    "message": MessageEvent;
    "offline": Event;
    "online": Event;
    "pagehide": PageTransitionEvent;
    "pageshow": PageTransitionEvent;
    "popstate": PopStateEvent;
    "storage": StorageEvent;
    "unload": Event;
}

interface WindowEventHandlers /*! @ooml-interface */ {
    /*! @ooml-mapto(addEventListener) */ addWindowEventHandlersEventListener<T extends WindowEventHandlersEventType>(type: __Class<T>, listener: EventListener<WindowEventHandlers, T>, options?: boolean | AddEventListenerOptions): void;
    /*! @ooml-mapto(removeEventListener) */ removeWindowEventHandlersEventListener<T extends WindowEventHandlersEventType>(type: __Class<T>, listener: EventListener<WindowEventHandlers, T>, options?: boolean | EventListenerOptions): void;
}

interface WorkerEventType extends AbstractWorkerEventType {
    "message": MessageEvent;
}

interface Worker extends AbstractWorker {
    /*! @ooml-mapto(addEventListener) */ addWorkerEventListener<T extends WorkerEventType>(type: __Class<T>, listener: EventListener<Worker, T>, options?: boolean | AddEventListenerOptions): void;
    /*! @ooml-mapto(removeEventListener) */ removeWorkerEventListener<T extends WorkerEventType>(type: __Class<T>, listener: EventListener<Worker, T>, options?: boolean | EventListenerOptions): void;
    /** @deprecated */
    postMessage(message: any, transfer?: any[]): void;
    terminate(): void;
}

declare var Worker: {
    prototype: Worker;
    new(stringUrl: string): Worker;
};

interface WritableStream {
    readonly locked: boolean;
    abort(reason?: any): Promise<void>;
    getWriter(): WritableStreamDefaultWriter;
}

declare var WritableStream: {
    prototype: WritableStream;
    new(underlyingSink?: UnderlyingSink, strategy?: QueuingStrategy): WritableStream;
};

interface WritableStreamDefaultController {
    error(error?: any): void;
}

declare var WritableStreamDefaultController: {
    prototype: WritableStreamDefaultController;
    new(): WritableStreamDefaultController;
};

interface WritableStreamDefaultWriter {
    readonly closed: Promise<void>;
    readonly desiredSize: number;
    readonly ready: Promise<void>;
    abort(reason?: any): Promise<void>;
    close(): Promise<void>;
    releaseLock(): void;
    write(chunk?: any): Promise<any>;
}

declare var WritableStreamDefaultWriter: {
    prototype: WritableStreamDefaultWriter;
    new(): WritableStreamDefaultWriter;
};

interface XMLDocument extends Document {
    /*! @ooml-mapto(addEventListener) */ addXMLDocumentEventListener<T extends DocumentEventType>(type: __Class<T>, listener: EventListener<XMLDocument, T>, options?: boolean | AddEventListenerOptions): void;
    /*! @ooml-mapto(removeEventListener) */ removeXMLDocumentEventListener<T extends DocumentEventType>(type: __Class<T>, listener: EventListener<XMLDocument, T>, options?: boolean | EventListenerOptions): void;
}

declare var XMLDocument: {
    prototype: XMLDocument;
    new(): XMLDocument;
};

interface XMLHttpRequestEventType extends XMLHttpRequestEventTargetEventType {
    "readystatechange": Event;
}

interface XMLHttpRequest extends XMLHttpRequestEventTarget {
    /*! @ooml-mapto(addEventListener) */ addXMLHttpRequestEventListener<T extends XMLHttpRequestEventType>(type: __Class<T>, listener: EventListener<XMLHttpRequest, T>, options?: boolean | AddEventListenerOptions): void;
    /*! @ooml-mapto(removeEventListener) */ removeXMLHttpRequestEventListener<T extends XMLHttpRequestEventType>(type: __Class<T>, listener: EventListener<XMLHttpRequest, T>, options?: boolean | EventListenerOptions): void;
    msCaching: string;
    readonly readyState: number;
    readonly response: any;
    readonly responseText: string;
    responseType: XMLHttpRequestResponseType;
    readonly responseURL: string;
    readonly responseXML: Document | null;
    readonly status: number;
    readonly statusText: string;
    timeout: number;
    readonly upload: XMLHttpRequestUpload;
    withCredentials: boolean;
    abort(): void;
    getAllResponseHeaders(): string;
    getResponseHeader(header: string): string | null;
    msCachingEnabled(): boolean;
    open(method: string, url: string, async?: boolean, user?: string | null, password?: string | null): void;
    overrideMimeType(mime: string): void;
    send(data?: any): void;
    setRequestHeader(header: string, value: string): void;
}

declare var XMLHttpRequest: {
    prototype: XMLHttpRequest;
    new(): XMLHttpRequest;
    readonly DONE: number;
    readonly HEADERS_RECEIVED: number;
    readonly LOADING: number;
    readonly OPENED: number;
    readonly UNSENT: number;
};

interface XMLHttpRequestEventTargetEventType {
    "abort": Event;
    "error": ErrorEvent;
    "load": Event;
    "loadend": ProgressEvent;
    "loadstart": Event;
    "progress": ProgressEvent;
    "timeout": ProgressEvent;
}

interface XMLHttpRequestEventTarget extends EventTarget {
    /*! @ooml-mapto(addEventListener) */ addXMLHttpRequestEventTargetEventListener<T extends XMLHttpRequestEventTargetEventType>(type: __Class<T>, listener: EventListener<XMLHttpRequestEventTarget, T>, options?: boolean | AddEventListenerOptions): void;
    /*! @ooml-mapto(removeEventListener) */ removeXMLHttpRequestEventTargetEventListener<T extends XMLHttpRequestEventTargetEventType>(type: __Class<T>, listener: EventListener<XMLHttpRequestEventTarget, T>, options?: boolean | EventListenerOptions): void;
}

interface XMLHttpRequestUpload extends XMLHttpRequestEventTarget {
    /*! @ooml-mapto(addEventListener) */ addXMLHttpRequestUploadEventListener<T extends XMLHttpRequestEventTargetEventType>(type: __Class<T>, listener: EventListener<XMLHttpRequestUpload, T>, options?: boolean | AddEventListenerOptions): void;
    /*! @ooml-mapto(removeEventListener) */ removeXMLHttpRequestUploadEventListener<T extends XMLHttpRequestEventTargetEventType>(type: __Class<T>, listener: EventListener<XMLHttpRequestUpload, T>, options?: boolean | EventListenerOptions): void;
}

declare var XMLHttpRequestUpload: {
    prototype: XMLHttpRequestUpload;
    new(): XMLHttpRequestUpload;
};

interface XMLSerializer {
    serializeToString(target: Node): string;
}

declare var XMLSerializer: {
    prototype: XMLSerializer;
    new(): XMLSerializer;
};

interface XPathEvaluator {
    createExpression(expression: string, resolver: XPathNSResolver): XPathExpression;
    createNSResolver(nodeResolver?: Node): XPathNSResolver;
    evaluate(expression: string, contextNode: Node, resolver: XPathNSResolver | null, type: number, result: XPathResult | null): XPathResult;
}

declare var XPathEvaluator: {
    prototype: XPathEvaluator;
    new(): XPathEvaluator;
};

interface XPathExpression {
    evaluate(contextNode: Node, type: number, result: XPathResult | null): XPathResult;
}

declare var XPathExpression: {
    prototype: XPathExpression;
    new(): XPathExpression;
};

interface XPathNSResolver {
    lookupNamespaceURI(prefix: string): string;
}

declare var XPathNSResolver: {
    prototype: XPathNSResolver;
    new(): XPathNSResolver;
};

interface XPathResult {
    readonly booleanValue: boolean;
    readonly invalidIteratorState: boolean;
    readonly numberValue: number;
    readonly resultType: number;
    readonly singleNodeValue: Node;
    readonly snapshotLength: number;
    readonly stringValue: string;
    iterateNext(): Node;
    snapshotItem(index: number): Node;
}

declare var XPathResult: {
    prototype: XPathResult;
    new(): XPathResult;
    readonly ANY_TYPE: number;
    readonly ANY_UNORDERED_NODE_TYPE: number;
    readonly BOOLEAN_TYPE: number;
    readonly FIRST_ORDERED_NODE_TYPE: number;
    readonly NUMBER_TYPE: number;
    readonly ORDERED_NODE_ITERATOR_TYPE: number;
    readonly ORDERED_NODE_SNAPSHOT_TYPE: number;
    readonly STRING_TYPE: number;
    readonly UNORDERED_NODE_ITERATOR_TYPE: number;
    readonly UNORDERED_NODE_SNAPSHOT_TYPE: number;
};

interface XSLTProcessor {
    clearParameters(): void;
    getParameter(namespaceURI: string, localName: string): any;
    importStylesheet(style: Node): void;
    removeParameter(namespaceURI: string, localName: string): void;
    reset(): void;
    setParameter(namespaceURI: string, localName: string, value: any): void;
    transformToDocument(source: Node): Document;
    transformToFragment(source: Node, document: Document): DocumentFragment;
}

declare var XSLTProcessor: {
    prototype: XSLTProcessor;
    new(): XSLTProcessor;
};

interface webkitRTCPeerConnection extends RTCPeerConnection {
    /*! @ooml-mapto(addEventListener) */ addwebkitRTCPeerConnectionEventListener<T extends RTCPeerConnectionEventType>(type: __Class<T>, listener: EventListener<webkitRTCPeerConnection, T>, options?: boolean | AddEventListenerOptions): void;
    /*! @ooml-mapto(removeEventListener) */ removewebkitRTCPeerConnectionEventListener<T extends RTCPeerConnectionEventType>(type: __Class<T>, listener: EventListener<webkitRTCPeerConnection, T>, options?: boolean | EventListenerOptions): void;
}

declare var webkitRTCPeerConnection: {
    prototype: webkitRTCPeerConnection;
    new(configuration: RTCConfiguration): webkitRTCPeerConnection;
};

interface DecodeErrorCallback {
    (error: DOMException): void;
}

interface DecodeSuccessCallback {
    (decodedData: AudioBuffer): void;
}

interface FrameRequestCallback {
    (time: number): void;
}

interface FunctionStringCallback {
    (data: string): void;
}

interface IntersectionObserverCallback {
    (entries: IntersectionObserverEntry[], observer: IntersectionObserver): void;
}

interface MSLaunchUriCallback {
    (): void;
}

interface MediaQueryListListener {
    (mql: MediaQueryList): void;
}

interface MutationCallback {
    (mutations: MutationRecord[], observer: MutationObserver): void;
}

interface NavigatorUserMediaErrorCallback {
    (error: MediaStreamError): void;
}

interface NavigatorUserMediaSuccessCallback {
    (stream: MediaStream): void;
}

interface NotificationPermissionCallback {
    (permission: NotificationPermission): void;
}

interface PositionCallback {
    (position: Position): void;
}

interface PositionErrorCallback {
    (error: PositionError): void;
}

interface RTCPeerConnectionErrorCallback {
    (error: DOMError): void;
}

interface RTCSessionDescriptionCallback {
    (sdp: RTCSessionDescription): void;
}

interface RTCStatsCallback {
    (report: RTCStatsReport): void;
}

interface WritableStreamChunkCallback {
    (chunk: any, controller: WritableStreamDefaultController): void;
}

interface WritableStreamDefaultControllerCallback {
    (controller: WritableStreamDefaultController): void;
}

interface WritableStreamErrorCallback {
    (reason: string): void;
}

declare var applicationCache: ApplicationCache;
declare var caches: CacheStorage;
declare var clientInformation: Navigator;
declare var closed: boolean;
declare var crypto: Crypto;
declare var defaultStatus: string;
declare var devicePixelRatio: number;
declare var doNotTrack: string;
declare var document: Document;
declare var external: External;
declare var frameElement: Element;
declare var frames: Window;
declare var history: History;
declare var innerHeight: number;
declare var innerWidth: number;
declare var isSecureContext: boolean;
declare var length: number;
declare var location: Location;
declare var locationbar: BarProp;
declare var menubar: BarProp;
declare var msCredentials: MSCredentials;
declare var navigator: Navigator;
declare var offscreenBuffering: string | boolean;
declare var opener: any;
declare var orientation: string | number;
declare var outerHeight: number;
declare var outerWidth: number;
declare var pageXOffset: number;
declare var pageYOffset: number;
declare var parent: Window;
declare var performance: Performance;
declare var personalbar: BarProp;
declare var screen: Screen;
declare var screenLeft: number;
declare var screenTop: number;
declare var screenX: number;
declare var screenY: number;
declare var scrollX: number;
declare var scrollY: number;
declare var scrollbars: BarProp;
declare var self: Window;
declare var speechSynthesis: SpeechSynthesis;
declare var status: string;
declare var statusbar: BarProp;
declare var styleMedia: StyleMedia;
declare var toolbar: BarProp;
declare var top: Window;
declare var window: Window;
declare function alert(message?: any): void;
declare function blur(): void;
declare function cancelAnimationFrame(handle: number): void;
declare function captureEvents(): void;
declare function close(): void;
declare function confirm(message?: string): boolean;
declare function createImageBitmap(image: HTMLImageElement | SVGImageElement | HTMLVideoElement | HTMLCanvasElement | ImageBitmap | ImageData | Blob, options?: ImageBitmapOptions): Promise<ImageBitmap>;
declare function createImageBitmap(image: HTMLImageElement | SVGImageElement | HTMLVideoElement | HTMLCanvasElement | ImageBitmap | ImageData | Blob, sx: number, sy: number, sw: number, sh: number, options?: ImageBitmapOptions): Promise<ImageBitmap>;
declare function departFocus(navigationReason: NavigationReason, origin: FocusNavigationOrigin): void;
declare function focus(): void;
declare function getComputedStyle(elt: Element, pseudoElt?: string | null): CSSStyleDeclaration;
declare function getMatchedCSSRules(elt: Element, pseudoElt?: string | null): CSSRuleList;
declare function getSelection(): Selection;
declare function matchMedia(mediaQuery: string): MediaQueryList;
declare function moveBy(x?: number, y?: number): void;
declare function moveTo(x?: number, y?: number): void;
declare function msWriteProfilerMark(profilerMarkName: string): void;
declare function open(url?: string, target?: string, features?: string, replace?: boolean): Window | null;
declare function postMessage(message: any, targetOrigin: string, transfer?: any[]): void;
declare function print(): void;
declare function prompt(message?: string, _default?: string): string | null;
declare function releaseEvents(): void;
declare function requestAnimationFrame(callback: FrameRequestCallback): number;
declare function resizeBy(x?: number, y?: number): void;
declare function resizeTo(x?: number, y?: number): void;
declare function scroll(options: ScrollToOptions): void;
declare function scroll(x?: number, y?: number): void;
declare function scrollBy(options: ScrollToOptions): void;
declare function scrollBy(x?: number, y?: number): void;
declare function scrollTo(options: ScrollToOptions): void;
declare function scrollTo(x?: number, y?: number): void;
declare function stop(): void;
declare function webkitCancelAnimationFrame(handle: number): void;
declare function webkitConvertPointFromNodeToPage(node: Node, pt: WebKitPoint): WebKitPoint;
declare function webkitConvertPointFromPageToNode(node: Node, pt: WebKitPoint): WebKitPoint;
declare function webkitRequestAnimationFrame(callback: FrameRequestCallback): number;
declare function dispatchEvent(evt: Event): boolean;
declare function clearInterval(handle: number): void;
declare function clearTimeout(handle: number): void;
declare function setInterval(handler: (...args: any[]) => void, timeout: number): number;
declare function setTimeout(handler: (...args: any[]) => void, timeout: number): number;
declare var sessionStorage: Storage;
declare var localStorage: Storage;
declare var console: Console;
declare var indexedDB: IDBFactory;
declare function atob(encodedString: string): string;
declare function btoa(rawString: string): string;
declare function fetch(input?: Request | string, init?: RequestInit): Promise<Response>;
declare function addEventListener<SpecificType extends WindowEventType>(type: __Class<SpecificType>, listener: EventListener<Window, SpecificType>, options?: boolean | AddEventListenerOptions): void;
declare function removeEventListener<SpecificType extends WindowEventType>(type: __Class<SpecificType>, listener: EventListener<Window, SpecificType>, options?: boolean | EventListenerOptions): void;
type ScrollBehavior = "auto" | "instant" | "smooth";
type ScrollLogicalPosition = "start" | "center" | "end" | "nearest";
type MouseWheelEvent = WheelEvent;
type ScrollRestoration = "auto" | "manual";
type FormDataEntryValue = string | File;
type InsertPosition = "beforebegin" | "afterbegin" | "beforeend" | "afterend";
type HeadersInit = Headers | string[][] | { [key: string]: string; };
type OrientationLockType = "any" | "natural" | "portrait" | "landscape" | "portrait-primary" | "portrait-secondary" | "landscape-primary"| "landscape-secondary";
type IDBValidKey = number | string | Date | IDBArrayKey;
type AlgorithmIdentifier = Algorithm;
type MutationRecordType = "attributes" | "characterData" | "childList";
type AAGUID = string;
type BodyInit = any;
type ByteString = string;
type ConstrainBoolean = boolean | ConstrainBooleanParameters;
type ConstrainDOMString = string | string[] | ConstrainDOMStringParameters;
type ConstrainDouble = number | ConstrainDoubleRange;
type ConstrainLong = number | ConstrainLongRange;
type CryptoOperationData = ArrayBufferView;
type GLbitfield = number;
type GLboolean = boolean;
type GLbyte = number;
type GLclampf = number;
type GLenum = number;
type GLfloat = number;
type GLint = number;
type GLintptr = number;
type GLshort = number;
type GLsizei = number;
type GLsizeiptr = number;
type GLubyte = number;
type GLuint = number;
type GLushort = number;
type IDBKeyPath = string;
type MSInboundPayload = MSVideoRecvPayload | MSAudioRecvPayload;
type MSLocalClientEvent = MSLocalClientEventBase | MSAudioLocalClientEvent;
type MSOutboundPayload = MSVideoSendPayload | MSAudioSendPayload;
type RTCIceGatherCandidate = RTCIceCandidateDictionary | RTCIceCandidateComplete;
type RTCTransport = RTCDtlsTransport | RTCSrtpSdesTransport;
type RequestInfo = Request | string;
type USVString = string;
type payloadtype = number;
type BufferSource = ArrayBuffer | ArrayBufferView;
type ClientTypes = "window" | "worker" | "sharedworker" | "all";
type AppendMode = "segments" | "sequence";
type AudioContextLatencyCategory = "balanced" | "interactive" | "playback";
type AudioContextState = "suspended" | "running" | "closed";
type BinaryType = "blob" | "arraybuffer";
type BiquadFilterType = "lowpass" | "highpass" | "bandpass" | "lowshelf" | "highshelf" | "peaking" | "notch" | "allpass";
type CanPlayTypeResult = "" | "maybe" | "probably";
type CanvasFillRule = "nonzero" | "evenodd";
type ChannelCountMode = "max" | "clamped-max" | "explicit";
type ChannelInterpretation = "speakers" | "discrete";
type DisplayCaptureSurfaceType = "monitor" | "window" | "application" | "browser";
type DistanceModelType = "linear" | "inverse" | "exponential";
type DocumentReadyState = "loading" | "interactive" | "complete";
type EndOfStreamError = "network" | "decode";
type ExpandGranularity = "character" | "word" | "sentence" | "textedit";
type GamepadHand = "" | "left" | "right";
type GamepadHapticActuatorType = "vibration";
type GamepadInputEmulationType = "mouse" | "keyboard" | "gamepad";
type GamepadMappingType = "" | "standard";
type IDBCursorDirection = "next" | "nextunique" | "prev" | "prevunique";
type IDBRequestReadyState = "pending" | "done";
type IDBTransactionMode = "readonly" | "readwrite" | "versionchange";
type KeyFormat = "raw" | "spki" | "pkcs8" | "jwk";
type KeyType = "public" | "private" | "secret";
type KeyUsage = "encrypt" | "decrypt" | "sign" | "verify" | "deriveKey" | "deriveBits" | "wrapKey" | "unwrapKey";
type ListeningState = "inactive" | "active" | "disambiguation";
type MSCredentialType = "FIDO_2_0";
type MSIceAddrType = "os" | "stun" | "turn" | "peer-derived";
type MSIceType = "failed" | "direct" | "relay";
type MSStatsType = "description" | "localclientevent" | "inbound-network" | "outbound-network" | "inbound-payload" | "outbound-payload" | "transportdiagnostics";
type MSTransportType = "Embedded" | "USB" | "NFC" | "BT";
type MSWebViewPermissionState = "unknown" | "defer" | "allow" | "deny";
type MSWebViewPermissionType = "geolocation" | "unlimitedIndexedDBQuota" | "media" | "pointerlock" | "webnotifications";
type MediaDeviceKind = "audioinput" | "audiooutput" | "videoinput";
type MediaKeyMessageType = "license-request" | "license-renewal" | "license-release" | "individualization-request";
type MediaKeySessionType = "temporary" | "persistent-license" | "persistent-release-message";
type MediaKeyStatus = "usable" | "expired" | "output-downscaled" | "output-not-allowed" | "status-pending" | "internal-error";
type MediaKeysRequirement = "required" | "optional" | "not-allowed";
type MediaStreamTrackState = "live" | "ended";
type NavigationReason = "up" | "down" | "left" | "right";
type NavigationType = "navigate" | "reload" | "back_forward" | "prerender";
type NotificationDirection = "auto" | "ltr" | "rtl";
type NotificationPermission = "default" | "denied" | "granted";
type OscillatorType = "sine" | "square" | "sawtooth" | "triangle" | "custom";
type OverSampleType = "none" | "2x" | "4x";
type PanningModelType = "equalpower" | "HRTF";
type PaymentComplete = "success" | "fail" | "unknown";
type PaymentShippingType = "shipping" | "delivery" | "pickup";
type PushEncryptionKeyName = "p256dh" | "auth";
type PushPermissionState = "granted" | "denied" | "prompt";
type RTCBundlePolicy = "balanced" | "max-compat" | "max-bundle";
type RTCDegradationPreference = "maintain-framerate" | "maintain-resolution" | "balanced";
type RTCDtlsRole = "auto" | "client" | "server";
type RTCDtlsTransportState = "new" | "connecting" | "connected" | "closed";
type RTCIceCandidateType = "host" | "srflx" | "prflx" | "relay";
type RTCIceComponent = "RTP" | "RTCP";
type RTCIceConnectionState = "new" | "checking" | "connected" | "completed" | "failed" | "disconnected" | "closed";
type RTCIceGatherPolicy = "all" | "nohost" | "relay";
type RTCIceGathererState = "new" | "gathering" | "complete";
type RTCIceGatheringState = "new" | "gathering" | "complete";
type RTCIceProtocol = "udp" | "tcp";
type RTCIceRole = "controlling" | "controlled";
type RTCIceTcpCandidateType = "active" | "passive" | "so";
type RTCIceTransportPolicy = "none" | "relay" | "all";
type RTCIceTransportState = "new" | "checking" | "connected" | "completed" | "disconnected" | "closed";
type RTCSdpType = "offer" | "pranswer" | "answer";
type RTCSignalingState = "stable" | "have-local-offer" | "have-remote-offer" | "have-local-pranswer" | "have-remote-pranswer" | "closed";
type RTCStatsIceCandidatePairState = "frozen" | "waiting" | "inprogress" | "failed" | "succeeded" | "cancelled";
type RTCStatsIceCandidateType = "host" | "serverreflexive" | "peerreflexive" | "relayed";
type RTCStatsType = "inboundrtp" | "outboundrtp" | "session" | "datachannel" | "track" | "transport" | "candidatepair" | "localcandidate" | "remotecandidate";
type ReadyState = "closed" | "open" | "ended";
type ReferrerPolicy = "" | "no-referrer" | "no-referrer-when-downgrade" | "origin-only" | "origin-when-cross-origin" | "unsafe-url";
type RequestCache = "default" | "no-store" | "reload" | "no-cache" | "force-cache";
type RequestCredentials = "omit" | "same-origin" | "include";
type RequestDestination = "" | "document" | "sharedworker" | "subresource" | "unknown" | "worker";
type RequestMode = "navigate" | "same-origin" | "no-cors" | "cors";
type RequestRedirect = "follow" | "error" | "manual";
type RequestType = "" | "audio" | "font" | "image" | "script" | "style" | "track" | "video";
type ResponseType = "basic" | "cors" | "default" | "error" | "opaque" | "opaqueredirect";
type ScopedCredentialType = "ScopedCred";
type ServiceWorkerState = "installing" | "installed" | "activating" | "activated" | "redundant";
type TextTrackKind = "subtitles" | "captions" | "descriptions" | "chapters" | "metadata";
type TextTrackMode = "disabled" | "hidden" | "showing";
type Transport = "usb" | "nfc" | "ble";
type VRDisplayEventReason = "mounted" | "navigation" | "requested" | "unmounted";
type VREye = "left" | "right";
type VideoFacingModeEnum = "user" | "environment" | "left" | "right";
type VisibilityState = "hidden" | "visible" | "prerender" | "unloaded";
type XMLHttpRequestResponseType = "" | "arraybuffer" | "blob" | "document" | "json" | "text";
