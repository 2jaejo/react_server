import { OPCUAClient, AttributeIds } from 'node-opcua';

class OPCUAClientModule {
  constructor() {
    if (OPCUAClientModule.instance) {
      return OPCUAClientModule.instance; // 이미 인스턴스가 있으면 기존 인스턴스를 반환
    }

    this.client = OPCUAClient.create({
      endpointMustExist: false,
    });
    this.session = null;

    OPCUAClientModule.instance = this; // 인스턴스를 static 속성으로 저장
  }

  // 싱글톤 인스턴스를 반환하는 메서드
  static getInstance() {
    if (!OPCUAClientModule.instance) {
      OPCUAClientModule.instance = new OPCUAClientModule();
    }
    return OPCUAClientModule.instance;
  }

  async connect(endpoint) {
    try {
      await this.client.connect(endpoint);
      this.session = await this.client.createSession();
      console.log("OPC UA 서버에 연결되었습니다.");
    } catch (error) {
      console.error("OPC UA 서버 연결 실패:", error);
      throw error;
    }
  }

  async readNode(nodeId) {
    if (!this.session) {
      throw new Error("OPC UA 세션이 없습니다. 먼저 connect()를 호출해야 합니다.");
    }
    try {
      const dataValue = await this.session.read({
        nodeId: nodeId,
        attributeId: AttributeIds.Value,
      });
      return dataValue.value.value;
    } catch (error) {
      console.error("노드 읽기 실패:", error);
      throw error;
    }
  }

  async close() {
    if (this.session) {
      await this.session.close();
      this.session = null;
      console.log("세션이 종료되었습니다.");
    }
    await this.client.disconnect();
    console.log("OPC UA 클라이언트가 종료되었습니다.");
  }
}

export default OPCUAClientModule;
