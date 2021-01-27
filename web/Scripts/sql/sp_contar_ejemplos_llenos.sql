CREATE PROCEDURE [dbo].[sp_contar_ejemplos_por_guiapostulante]

AS
BEGIN


	SELECT COUNT(*) FROM GuiaPostulantes 
	 WHERE InstitucionPostulanteID = @InstitucionPostulanteID
	 AND GuiaPostulanteID = @GuiaID
	 AND AreadeMejoras IS NOT NULL

END