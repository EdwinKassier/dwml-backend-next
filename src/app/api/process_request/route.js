import { NextResponse } from 'next/server';
import { Errors } from "../../utils/errors.js"
import  DataCache  from "../../utils/data_cache.js";
import DataCollector from "../../utils/data_collector.js";
import  GraphCreator  from "../../utils/graph_creator.js";

export async function GET(request) {


    console.log(request.nextUrl.searchParams.get("symbol"))

    var symbol = request.nextUrl.searchParams.get("symbol") !== null ? request.nextUrl.searchParams.get("symbol") : ""
    var investment = request.nextUrl.searchParams.get("investment") !== null ? parseFloat(request.nextUrl.searchParams.get("investment")) : ""

    if (symbol == "" ){
        return NextResponse.json({"result":"Symbol doesn't exist","graph_data":"Symbol doesn't exist"});
      }

      if (investment=="" || typeof investment == 'string'){
        return NextResponse.json({"result":"Invalid investment amount","graph_data":"Invalid investment amount"});
      }

    const cache = new DataCache(symbol, investment);
    const collector = new DataCollector(symbol, investment);
    const creator = new GraphCreator(symbol, investment);

    let result = await collector.driverLogic()
    let graph_data = await creator.driver_logic()

    if (result == undefined){
        result = "Symbol doesn't exist"
        graph_data = "Symbol doesn't exist"
      }

    console.log(`We have received the result ${result}`)

    return NextResponse.json({ result: result, graph_data: graph_data });

  }