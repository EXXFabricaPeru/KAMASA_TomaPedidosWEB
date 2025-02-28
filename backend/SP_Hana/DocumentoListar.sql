ALTER PROCEDURE "EXX_TPED_PedidoVentaxVendedor_Listar"
(
	IN P_Vendedor int,
	IN P_FecIni varchar(8),
	IN P_FecFin varchar(8),
	IN P_Tipo int,
	IN P_Cliente varchar(50)
)
AS
BEGIN
	
	IF (:P_Tipo = 1) THEN
		SELECT	"pec"."DocEntry",
				"pec"."DocNum" as "NroPed",
				"cli"."CardName" as "NombreCliente",
				"pec"."DocCur" as "Moneda",
				--"pec"."NumAtCard" as "NroOc",
				--"pec"."DiscPrcnt" as "Descuento",
				CASE WHEN "pec"."DocCur" = 'SOL' THEN "pec"."DocTotal" ELSE "pec"."DocTotalFC" END as "Total",
				"pec"."DocDate" as "FechaPed",
				"pec"."DocDueDate" as "FecEntrega",
				'Cotizacion' As "Estado"
		FROM "OQUT" "pec"
		INNER JOIN "OCRD" "cli" ON "pec"."CardCode" = "cli"."CardCode"
		INNER JOIN "OSLP" "ven" ON "ven"."SlpCode" = "cli"."SlpCode"
		WHERE "ven"."SlpCode" = :P_Vendedor
		  AND ("pec"."DocDate" >= :P_FecIni OR '0' = :P_FecIni)
		  AND ("pec"."DocDate" <= :P_FecFin OR '0' = :P_FecFin)
		  AND ("pec"."CardName" LIKE '%' || :P_Cliente || '%');
	END IF;
	
	IF (:P_Tipo = 2) THEN
		SELECT	"pec"."DocEntry",
				"pec"."DocNum" as "NroPed",
				"cli"."CardName" as "NombreCliente",
				"pec"."DocCur" as "Moneda",
				--"pec"."NumAtCard" as "NroOc",
				--"pec"."DiscPrcnt" as "Descuento",
				CASE WHEN "pec"."DocCur" = 'SOL' THEN "pec"."DocTotal" ELSE "pec"."DocTotalFC" END as "Total",
				"pec"."DocDate" as "FechaPed",
				"pec"."DocDueDate" as "FecEntrega",
				'Creado' as "Estado"
		FROM "ORDR" "pec"
		INNER JOIN "OCRD" "cli" ON "pec"."CardCode" = "cli"."CardCode"
		INNER JOIN "OSLP" "ven" ON "ven"."SlpCode" = "cli"."SlpCode"
		WHERE "ven"."SlpCode" = :P_Vendedor
		  AND ("pec"."DocDate" >= :P_FecIni OR '0' = :P_FecIni)
		  AND ("pec"."DocDate" <= :P_FecFin OR '0' = :P_FecFin)
		  AND ("pec"."CardName" LIKE '%' || :P_Cliente || '%')
		
		UNION ALL

		SELECT	"pec"."DocEntry",
				"pec"."DocNum" as "NroPed",
				"cli"."CardName" as "NombreCliente",
				"pec"."DocCur" as "Moneda",
				--"pec"."NumAtCard" as "NroOc",
				--"pec"."DiscPrcnt" as "Descuento",
				CASE WHEN "pec"."DocCur" = 'SOL' THEN "pec"."DocTotal" ELSE "pec"."DocTotalFC" END as "Total",
				"pec"."DocDate" as "FechaPed",
				"pec"."DocDueDate" as "FecEntrega",
				CASE WHEN IFNULL("pec"."U_EXK_AUTPED", 'N') = 'N' THEN 'PENDIENTE' ELSE 'APROBADO' END as "Estado"
		FROM "ODRF" "pec"
		INNER JOIN "OCRD" "cli" ON "pec"."CardCode" = "cli"."CardCode"
		INNER JOIN "OSLP" "ven" ON "ven"."SlpCode" = "cli"."SlpCode"
		WHERE "ven"."SlpCode" = :P_Vendedor
		  AND ("pec"."DocDate" >= :P_FecIni OR '0' = :P_FecIni)
		  AND ("pec"."DocDate" <= :P_FecFin OR '0' = :P_FecFin)
		  AND ("pec"."CardName" LIKE '%' || :P_Cliente || '%');
	END IF;
END