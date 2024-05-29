export interface User {
    id: number;
    firstName: string;
    lastName: string;
    country: string;
    pinCode?:number;
}

export interface KeyValueString {
    [key:string] : string;
}


import { Logger } from "@aws-lambda-powertools/logger";

export interface BaseServiceResponse {
    status: string;
    message?: string;
} 

export interface KeyValueNumber {
    [key: string]: number | null | undefined;
}

export interface KeyStringValueAny {
    [key: string]: any;
}

export interface BaseRepositoryParams {
    logger: Logger;
    persistenceConfig: KeyValueString;
}

export interface BaseServiceParams {
    logger: Logger;
}

export interface Insights {
    insightsId: string;
    testTakerProfileId: string;
    awsRequestId?: string;
    sisResponse?: SISResponse;
    insightsResponse?: InsightsResponse;
    recommendationResponse?: any;
    persistMessage?: KeyStringValueAny | null;
}

export interface InsightsRequest {
    testTakerProfileId: string;
    awsRequestId: string;
    program: string;
}

export interface InsightsResponse {
    testTakerProfileId: string;
    testTakerState: string;
    upcomingIBTTestInfo?: UpcomingIBTTestInfo | null;
    mostRecentScore?: MostRecentScore | null;
    testPrep?: TestPrepItem[];
    performance?: Performance | null;
    recommendedProducts?: any;
    profile?: any;
}

export interface Test {
    testId?: string;
    skuId: number | undefined;
    testName?: string;
    testDate?: string;
    orderItemId: number;
}

export interface MostRecentScore extends Test {
    score?: number | null;
    maxScore?: number;
    measureLevelScores?: KeyValueNumber | {};
    estimatedIBTScore?: string;
    skillLevel?: string;
    productType: string;
}

export interface UpcomingIBTTestInfo extends Test {}

export interface TestPrepItem extends Test {
    myScore?: number | null;
    status?: string;
    scoreStatus?: string;
    category?: string;
    purchaseDate: string;
    productPurchaseLink?: string;
    localAppointmentDateTime?: string;
    productType: string;
    testCode?: string;
    fulfillmentType?: string;
    maxScore?: number | null | undefined;
    authorizationCode?: string;
    productVendorCode?: string;
    orderId?: string;
    measureLevelScores?: KeyValueNumber | {};
}

export interface Performance {
    sectionData: SectionDataItems;
}

export interface SectionDataItems {
    [key: string]: SectionDataItemDetails;
}

export interface SectionDataItemDetails {
    totalPoints?: number;
    maxPoints?: number;
    performanceHistory?: PerformanceHistory[];
}

export interface PerformanceHistory extends Test {
    testCompleteDate: string | undefined;
    percentScore?: number | null;
    numCorrect: number;
    numItems: number;
    numStarts?: number;
    displayScore?: string;
    scoreDetails?: string;
    skillLevel?: string;
    itemLevelData?: ItemLevelData;
    score?: number | null;
    maxScore?: number;
    productType: string;
}

export interface ItemLevelData {
    [key: string]: ItemLevelDataItem[];
}

export interface ItemLevelDataItem {
    score: number | undefined | null;
    maxScore?: number | undefined | null;
    itemAccNum: string | undefined;
}

export interface SISResponse {
    status?: string;
    errorCode?: string;
    result?: SISResult;
}

export interface SISResult {
    testTakerProfileId: string;
    time: string;
    program?: string;
    testTakerData?: SISTestTakerData;
}

export interface SISTestTakerData {
    orderItems: SISOrderItem[];
    profile: any;
    resultData: SISPerformance;
}

export interface SISOrderItem {
    orderItemId: number;
    resultSource: string;
    productName: string;
    ebookDownloadUrl?: string;
    submitDate: string;
    skuId: number;
    quantity: number;
    fulfillmentType: string;
    deliveryType: string;
    appointment?: Appointment;
    authorizationCode?: string;
    productVendorCode?: string;
    orderId: string;
}

export interface Appointment {
    localAppointmentDateTime: string;
    testCode: string;
}

export interface SISPerformance {
    [key: string]: SISPerformanceItem[];
}

export interface SISPerformanceItem {
    orderItemId: number;
    scores?: SISScore[];
    myBestScores?: MyBestScores[];
    questionResults?: QuestionResults[];
    productResults?: ProductResults[];
    program: string;
    resultStatus?: string;
    scoreStatus?: string;
    testName: string;
    appointmentDate?: string;
    registrationSystemId?: string;
    skuId?: number;
    numStarts?: number;
    testDescription?: string;
    startUTC?: string;
    completeUTC?: string;
    scoringCompleteUTC?: string;
    browser?: string;
    operatingSystem?: string;
    streakCount?: number;
}

export interface SISScore {
    scoreId: string;
    scoreName: string;
    scoreValue: string;
}

export interface MyBestScores extends SISScore {
    sourceAppointmentNumber: string;
    sourceAppointmentDateTime: string;
}

export interface QuestionResults {
    itemAccNum: string;
    itemType?: string;
    score: number;
    setAccNum: string;
    itemEditCode: number;
    reportingGroup: string | string[];
    ibisItemType?: string;
    testReadyItemType?: string;
    maxScore?: number;
}

export interface ProductResults {
    measure: string;
    rawScore: number;
    percentScore: number;
    displayScore: string;
    scaledScore?: number;
    totalSeconds: number;
    numCorrect: number;
    numItems: number;
    numIncomplete: number;
    numIncorrect: number;
    numScorable: number;
    numUnscored: number;
    numOmitted: number;
    maxScore?: number;
    skillLevel?: string;
    scoreDetails?: string;
}

export interface ConvertedSISPerformance {
    orderItemIds: {
        [key: string]: number[];
    } | null;
    performanceData: Map<number, SISPerformanceItem[]> | null;
}
