6.times do |i|
  6.times do |j|
    puts "#available-#{i+1}-#{j+1} {"
    puts "  grid-column: #{i+1} / #{i+1};"
    puts "  grid-row: #{j+1} / #{j+1};"
    puts "}"
  end
end
