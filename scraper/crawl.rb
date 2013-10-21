require 'harvestman'
require 'json'

base_url = "http://empleos.trabajo.gob.pe:8080/empleoperu/Vacante.do?method=listado_vacantes"
base_url = "http://localhost:8080/Vacantes.html"

vacantes = []
begin
  Harvestman.crawl base_url do
    i = 2
    
    base_xpath = "/html/body/table/tbody/tr[1]/td[2]/table/tbody/tr[8]/td/table/tbody/tr"
    xpath base_xpath  do |row|
      institucion = row.xpath( "#{base_xpath}[#{i}]/td[1]" ).strip
      j = 1
      inner_base_xpath = "#{base_xpath}[#{i}]/td[2]/table/tbody/tr" 
      xpath inner_base_xpath  do |col|
        oferta = {}
        oferta[:institucion] = institucion
        oferta[:vacante] = col.xpath( "#{inner_base_xpath}[#{j}]/td[1]" ).strip
        oferta[:descripcion] = col.xpath( "#{inner_base_xpath}[#{j}]/td[2]" ).strip
        oferta[:observacion] = col.xpath( "#{inner_base_xpath}[#{j}]/td[3]" ).strip
        j += 1
        vacantes << oferta
      end
      i += 1
    end
  end
rescue
  
end
puts JSON.pretty_generate vacantes


# /html/body/table/tbody/tr[1]/td[2]/table/tbody/tr[8]/td/table/tbody/tr/td/table/tbody/tr[87]/td[2]/table/tbody/tr
# /html/body/table/tbody/tr[1]/td[2]/table/tbody/tr[8]/td/table/tbody/tr[6]/td[2]/table/tbody/tr[6]/td[2]
# /html/body/table/tbody/tr[1]/td[2]/table/tbody/tr[8]/td/table/tbody/tr[31]/td[2]/table/tbody/tr[45]/td[2]
#/html/body/table/tbody/tr[1]/td[2]/table/tbody/tr[8]/td/table/tbody/tr[193]/td[2]/table/tbody/tr
