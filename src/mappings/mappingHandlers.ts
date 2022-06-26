import { ExecuteEvent } from "../types";
import { CosmosEvent } from "@subql/types-cosmos";

export async function handleEvent(event: CosmosEvent): Promise<void> {
  const eventRecord = new ExecuteEvent(
    `${event.tx.hash}-${event.msg.idx}-${event.idx}`
  );
  eventRecord.blockHeight = BigInt(event.block.block.header.height);
  eventRecord.txHash = event.tx.hash;
  for (const attr of event.event.attributes) {
    switch (attr.key) {
      case "_contract_address":
        eventRecord.contractAddress = attr.value;
        break;
      case "action":
        eventRecord.action = attr.value;
        break;
      case "sender":
        eventRecord.sender = attr.value;
        break;
      case "recipient":
        eventRecord.recipient = attr.value;
        break;
      case "spender":
        eventRecord.spender = attr.value;
        break;
      case "token_id":
        eventRecord.tokenId = attr.value;
        break;
      case "operator":
        eventRecord.operator = attr.value;
        break;
      default:
    }
  }
  await eventRecord.save();
}
