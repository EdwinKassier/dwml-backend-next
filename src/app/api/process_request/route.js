import { NextResponse } from 'next/server';
import { Errors } from "../../utils/errors.js"
import  DataCache  from "../../utils/data_cache.js";
import DataCollector from "../../utils/data_collector.js";
import  GraphCreator  from "../../utils/graph_creator.js";

export async function GET(request) {


    console.log(request.nextUrl.searchParams.get("symbol"))

    var symbol = request.nextUrl.searchParams.get("symbol") !== null ? request.nextUrl.searchParams.get("symbol") : 0
    var investment = request.nextUrl.searchParams.get("investment") !== null ? parseFloat(request.nextUrl.searchParams.get("investment")) : 0

    const cache = new DataCache(symbol, investment);
    const collector = new DataCollector(symbol, investment);
    const creator = new GraphCreator(symbol, investment);

    const result = await collector.driverLogic()
    const graph_data = await creator.driver_logic()

    console.log(`We have received the result ${result}`)

    return NextResponse.json({ result: result, graph_data: graph_data })

  }