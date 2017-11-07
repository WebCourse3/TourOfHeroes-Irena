interface Configuration {
	console: Boolean;
	file: Boolean;
	colors: Boolean;
	logLevel: Boolean;


}

class logger{
	name:string;
	configuration: Configuration;
	constructor(name:string, configuration:Configuration)
	{
		this.name = name;
		this.configuration = configuration;
	}
	log(level:Boolean, strings:Array<string>)
	{
		console.log(level,strings);
	}
	info(strings:Array<string>)
	{
		console.log("\x1b[32m%s\x1b[0m", strings);
	}
	warning(strings:Array<string>)
	{
		console.log("\x1b[33m%s\x1b[0m", strings);
	}
	error(strings:Array<string>)
	{
		console.log("\x1b[31m%s\x1b[0m", strings);
	}

}



