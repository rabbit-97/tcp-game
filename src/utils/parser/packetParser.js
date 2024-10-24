import { getProtoMessages } from '../../init/loadProtos.js';

export const parsePacket = (data) => {
  const protoMessages = getProtoMessages();

  // 공통 패킷 구조를 디코딩
  const Packet = protoMessages.common.Packet;
  let packet;
  try {
    packet = Packet.decode(data);
  } catch (error) {
    console.error(error);
  }

  const handlerId = packet.handlerId;
  const userId = packet.userId;
  const clientVersion = packet.clientVersion;
  const sequence = packet.sequence;

  console.log('clientVersion:', clientVersion);

  const protoTypeName = getProtoTypeNameHandlerId(handlerId);
  if (!protoTypeName) {
    console.error(`알 수 없는 핸들러 아이디 ID ${handlerId}`);
  }

  const [namespace, typeName] = protoTypeName.split('.');
  const PayloadType = protoMessages[namespace][typeName];
  let payload;
  try {
    payload = PayloadType.decode(packet.payload);
  } catch (error) {
    console.error(error);
  }
  return { handlerId, userId, payload, sequence };
};
